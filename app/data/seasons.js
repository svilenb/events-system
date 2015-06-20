var Season = require('mongoose').model('Season');
var async = require('async');

module.exports = {
    create: function(season, callback) {
        Season.create(season, callback);
    },
    get: function(callback) {
        Season.find({}).select('-_id name').lean(true).exec(callback);
    },
    seedInitialSeasons: function(callback) {
        Season.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find seasons: ' + err);
                return;
            }

            if (collection.length === 0) {
                async.parallel([
                    function(callback) {
                        Season.create({
                            name: "Started 2010"
                        }, callback);
                    },
                    function(callback) {
                        Season.create({
                            name: "Started 2011"
                        }, callback);
                    },
                    function(callback) {
                        Season.create({
                            name: "Started 2012"
                        }, callback);
                    },
                    function(callback) {
                        Season.create({
                            name: "Started 2013"
                        }, callback);
                    }
                ], function(err, results) {
                    if (err) {
                        return callback(err);
                    }

                    console.log("Seasons added to the database.");
                    callback(null, results);
                });
            } else {
                callback();
            }
        });
    }
};
