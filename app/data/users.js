var User = require('mongoose').model('User');
var encryption = require('../utilities/encryption');
var async = require('async');

module.exports = {
    create: function(user, callback) {
        User.create(user, callback);
    },
    seedInitialUsers: function(callback) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find users: ' + err);
                return;
            }

            if (collection.length === 0) {
                var stamatovsalt = encryption.generateSalt();
                var stamatovhashedPwd = encryption.generateHashedPassword(stamatovsalt, '123456');
                var peshovsalt = encryption.generateSalt();
                var peshovhashedPwd = encryption.generateHashedPassword(peshovsalt, '123456');

                async.parallel([
                    function(callback) {
                        User.create({
                            username: "stamatov",
                            eventPoints: 0,
                            firstName: "stamatov",
                            lastName: "stamatov",
                            phoneNumber: "0888888888",
                            email: "stamatov@stamatov.com",
                            salt: stamatovsalt,
                            hashPass: stamatovhashedPwd
                        }, callback);
                    },
                    function(callback) {
                        User.create({
                            username: "peshov",
                            eventPoints: 0,
                            firstName: "Peter",
                            lastName: "Petrov",
                            phoneNumber: "0888888888",
                            email: "pesho@pesho.com",
                            salt: peshovsalt,
                            hashPass: peshovhashedPwd
                        }, callback);
                    }
                ], function(err, results) {
                    if (err) {
                        return callback(err);
                    }

                    console.log("Users added to the database.");
                    callback(null, results);
                });
            } else {
                callback();
            }
        });
    },
    update: function(id, data, callback) {
        User.update({
            _id: id
        }, {
            $set: data
        }, callback);
    }
};
