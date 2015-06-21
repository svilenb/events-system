var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Initiative = mongoose.model('Initiative');
var Season = mongoose.model('Season');
var async = require('async');
var random = require('../utilities/random');
var async = require('async');

module.exports = {
    create: function(event, callback) {
        Event.crete(event, callback);
    },
    seedInitialEvents: function(users, categories, initiatives, seasons, callback) {
        Event.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find events: ' + err);
                return;
            }

            var seedEvent = function(callback) {
                Event.create({
                    title: random.getRandomString(5, 10),
                    description: random.getRandomString(20, 200),
                    user: users[random.getRandomInt(0, users.length)]._id,
                    location: {
                        latitude: random.getRandomNumber(0, 100),
                        longitude: random.getRandomNumber(0, 100),
                    },
                    type: {
                        initiative: initiatives[random.getRandomInt(0, initiatives.length)]._id,
                        season: seasons[random.getRandomInt(0, seasons.length)]._id
                    },
                    category: categories[random.getRandomInt(0, categories.length)]._id,
                    date: random.getRandomDate({
                        minYear: 2013,
                        maxYear: 2018,
                        minMonth: 0,
                        maxMonth: 11,
                        minDay: 1,
                        maxDay: 27
                    }),
                    evaluation: 150,
                    comments: ["can't wait", "mega cool"]
                }, callback);
            };

            if (collection.length === 0) {
                async.parallel([
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                    seedEvent,
                ], function(err) {
                    if (err) {
                        return callback(err);
                    }

                    console.log("Events added to the database.");
                    callback();
                });
            } else {
                callback();
            }
        });
    },
    getPassedevents: function(callback) {
        Event.find().where('date').lte(new Date()).populate('user category').exec(function(err, events) {
            if (err) {
                return callback(err);
            }

            async.parallel([
                function(callback) {
                    Initiative.populate(events, {
                        path: 'type.initiative'
                    }, callback);
                },
                function(callback) {
                    Season.populate(events, {
                        path: 'type.season'
                    }, callback);
                }
            ], function(err) {
                if (err) {
                    return callback(err);
                }

                callback(null, events);
            });
        });
    },
    getDetails: function(id, callback) {
        Event.findOne({
                _id: id
            })
            .populate('user category type.initiative type.season type')
            .select('-_id user.username title description date category.name type.initiative.name type.season.name location evaluation comments date')
            .lean(true)
            .exec(callback);
    },
    getUserActiveEvents: function(userId, callback) {
        var currentDate = new Date();
        Event.find()
            .where('user')
            .equals(userId)
            .where('date')
            .gte(currentDate)
            .populate('user category')
            .sort('date')
            .exec(function(err, events) {
                if (err) {
                    return callback(err);
                }

                async.parallel([
                    function(callback) {
                        Initiative.populate(events, {
                            path: 'type.initiative'
                        }, callback);
                    },
                    function(callback) {
                        Season.populate(events, {
                            path: 'type.season'
                        }, callback);
                    }
                ], function(err) {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, events);
                });
            });
    }
};
