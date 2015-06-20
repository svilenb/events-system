var Category = require('mongoose').model('Category');
var async = require('async');

module.exports = {
    create: function(category, callback) {
        Category.create(category, callback);
    },
    get: function(callback) {
        Category.find({}).select('-_id name').lean(true).exec(callback);
    },
    getByName: function(name, callback) {
        Category.findOne({
            'name': name
        }).exec(callback);
    },
    seedInitialCategories: function(callback) {
        Category.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find categories: ' + err);
                return;
            }

            if (collection.length === 0) {
                async.parallel([
                    function(callback) {
                        Category.create({
                            name: "team building"
                        }, callback);
                    },
                    function(callback) {
                        Category.create({
                            name: "party"
                        }, callback);
                    },
                    function(callback) {
                        Category.create({
                            name: "coding"
                        }, callback);
                    }
                ], function(err, results) {
                    if (err) {
                        return callback(err);
                    }

                    console.log("Categories added to the database.");
                    callback(null, results);
                });
            } else {
                callback();
            }
        });
    },
};
