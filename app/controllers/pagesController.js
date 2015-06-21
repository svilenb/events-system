var Controller = require('locomotive').Controller;
var pagesController = new Controller();
var eventsData = require('../data/events');
var moment = require('moment');

pagesController.error = function() {
    this.render();
};

pagesController.before('home', function(next) {
    var self = this;

    eventsData.getPassedevents(function(err, events) {
        if (err) {
            return next(err);
        }

        self.moment = moment;
        self.events = events;
        next();
    });
});

pagesController.home = function() {
    this.render();
};

module.exports = pagesController;
