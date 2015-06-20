var eventsData = require('../data/events');
var initiativesData = require('../data/initiatives');
var seasonsData = require('../data/seasons');
var categoriesData = require('../data/categories');
var Controller = require('locomotive').Controller;
var eventsController = new Controller();
var isAuthenticated = require('../utilities/auth').isAuthenticated;
var async = require('async');
var _ = require('underscore');

eventsController.getCreateEvent = function() {
    this.render();
};

eventsController.before('new', function(next) {
    isAuthenticated(this.req, this.res, next);
});

eventsController.before('new', function(next) {
    var self = this;
    async.parallel([function(callback) {
        initiativesData.get(function(err, initiatives) {
            if (err) {
                return callback(err);
            }

            self.initiatives = _.map(initiatives, function(initiative) {
                return initiative.name;
            });

            callback();
        });
    }, function(callback) {
        categoriesData.get(function(err, categories) {
            if (err) {
                return callback(err);
            }

            self.categories = _.map(categories, function(category) {
                return category.name;
            });

            callback();
        });
    }, function(callback) {
        seasonsData.get(function(err, seasons) {
            if (err) {
                return callback(err);
            }

            self.seasons = _.map(seasons, function(season) {
                return season.name;
            });

            callback();
        });
    }], function(err) {
        if (err) {
            return next(err);
        }

        next();
    });
});

eventsController.new = function() {
    this.render();
};

eventsController.before('create', function(next) {
    var self = this;
    categoriesData.getByName(this.param('category'), function(err, category) {
        if (err) {
            console.log(err);
        }

console.log(category);

        self.category = category;
    });
});

eventsController.create = function() {
    var username = this.req.user.username;
    var newEventData = {};
    newEventData.title = this.param('title');
    newEventData.description = this.param('description');
    newEventData.category = this.param('category');
    newEventData.latitude = this.param('latitude');
    newEventData.longitude = this.param('longitude');
    newEventData.type = {};
    newEventData.type.initiative = this.param('initiative');
    newEventData.type.initiative = this.param('season');
    newEventData.username = username;
    newEventData.evaluation = 0;
    eventsData.create(newEventData, this.res);
};

eventsController.before('show', function(next) {
    isAuthenticated(this.req, this.res, next);
});

eventsController.show = function() {
    var id = this.param('id');
    var self = this;

    eventsData.getDetails(id, function(err, event) {
        if (err) {
            console.log('Failed to get event: ' + err);
            return;
        }

        self.event = {};
        self.event.title = event.title;
        self.event.description = event.description;

        console.log('self event', JSON.stringify(self.event));
        self.render();
    });
};

eventsController.before('myEvents', function(next) {
    isAuthenticated(this.req, this.res, next);
});

eventsController.myEvents = function() {
    var userId = this.req.user._id;
    var self = this;

    eventsData.getActiveEvents(userId, function(err, events) {
        if (err) {
            return self.next(err);
        }

        self.events = events;
        self.render();
    });
};

eventsController.after('*', function(err, req, res, next) {
    if (err) {
        this.render('pages/error');
    }
});

module.exports = eventsController;
