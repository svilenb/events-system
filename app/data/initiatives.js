var Initiative = require('mongoose').model('Initiative');
var async = require('async');

module.exports = {
    create: function(initiative, callback) {
        Initiative.create(initiative, callback);
    },
    get: function(callback) {
        Initiative.find({}).select('name').lean(true).exec(callback);
    },
    getDetails: function(id, callback) {
        Initiative.findOne({
                _id: id
            })
            .lean(true)
            .exec(callback);
    },
    seedInitialInitiatives: function(callback) {
        Initiative.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find initiatives: ' + err);
                return;
            }

            if (collection.length === 0) {
                async.parallel([
                    function(callback) {
                        Initiative.create({
                            name: "Software Academy"
                        }, callback);
                    },
                    function(callback) {
                        Initiative.create({
                            name: "Algo Academy"
                        }, callback);
                    },
                    function(callback) {
                        Initiative.create({
                            name: "School Academy"
                        }, callback);
                    },
                    function(callback) {
                        Initiative.create({
                            name: "Kids Academy"
                        }, callback);
                    }
                ], function(err, results) {
                    if (err) {
                        return callback(err);
                    }

                    console.log("Initiatives added to the database.");
                    callback(null, results);
                });
            } else {
                callback();
            }
        });
    }
};
