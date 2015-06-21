var Controller = require('locomotive').Controller;
var users = require('../data/users');
var usersController = new Controller();
var passport = require('passport');
var fs = require('fs');
var encryption = require('../utilities/encryption');
var rootPath = require('../constants').rootPath;
var isAuthenticated = require('../utilities/auth').isAuthenticated;
var eventsData = require('../data/events');
var moment = require('moment');

usersController.getLogin = function() {
    this.render();
};

usersController.postLogin = function() {
    var req = this.req;
    var next = this.next;
    var self = this;

    var auth = passport.authenticate('local', function(err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            req.session.error = 'Invalid username or password!';
            this.redirect('/login');
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            self.redirect('/');
        });
    });

    auth(req, this.res, next);
};

usersController.before('logout', function(next) {
    isAuthenticated(this.req, this.res, next);
});

usersController.logout = function() {
    this.req.logout();
    this.redirect('/');
};

usersController.getRegister = function() {
    this.render();
};

usersController.postRegister = function() {
    var fstream;
    var newUserData = {};
    var req = this.req;
    var self = this;

    req.pipe(req.busboy);

    req.busboy.on('file', function(fieldname, file, filename) {
        if (!fs.existsSync(rootPath + 'public\\img\\users\\' + newUserData.username)) {
            fs.mkdirSync(rootPath + 'public\\img\\users\\' + newUserData.username);
        }

        var filePath = rootPath + 'public\\img\\users\\' + newUserData.username + '\\' + filename;
        fstream = fs.createWriteStream(filePath);
        file.pipe(fstream);
        newUserData.avatar = '\\img\\users\\' + newUserData.username + '\\' + filename;
    });

    req.busboy.on('field', function(fieldname, val) {
        newUserData[fieldname] = val;
    });

    req.busboy.on('finish', function() {
        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            self.redirect('/register');
        } else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function(err, user) {
                if (err) {
                    console.log(err);
                    return self.next(err);
                }

                req.logIn(user, function(err) {
                    if (err) {
                        console.log(err);
                        return self.next(err);
                    } else {
                        self.redirect('/');
                    }
                });
            });
        }
    });
};

usersController.before('activeEvents', function(next) {
    isAuthenticated(this.req, this.res, next);
});

usersController.activeEvents = function() {
    var userId = this.param('userId');
    var self = this;

    eventsData.getUserActiveEvents(userId, function(err, events) {
        if (err) {
            return self.next(err);
        }

        self.moment = moment;
        self.events = events;
        self.render();
    });
};

usersController.before('getProfile', function(next) {
    isAuthenticated(this.req, this.res, next);
});

usersController.getProfile = function() {
    var req = this.req;

    this.user = req.user;
    this.render();
};

usersController.after('*', function() {
    this.render('pages/error');
});

module.exports = usersController;
