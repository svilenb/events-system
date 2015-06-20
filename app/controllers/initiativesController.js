var initiativesData = require('../data/initiatives');
var Controller = require('locomotive').Controller;
var initiativesController = new Controller();
var isAuthenticated = require('../utilities/auth').isAuthenticated;
var async = require('async');
var _ = require('underscore');

initiativesController.before('index', function(next) {
    isAuthenticated(this.req, this.res, next);
});

initiativesController.index = function () {
    var self = this;
    initiativesData.get(function (err, initiatives) {
        if (err) {
            return self.render('pages/error');
        }

        self.initiatives = initiatives;
        self.render();
    });
};

initiativesController.before('edit', function(next) {
    isAuthenticated(this.req, this.res, next);
});

initiativesController.edit = function() {
    var id = this.param('id');
    var self = this;

    initiativesData.getDetails(id, function(err, initiative) {
        if (err) {
            return self.render('pages/error');
        }

        self.initiative = initiative;
        self.render();
    });
};

initiativesController.before('create', function (next) {
    isAuthenticated(this.req, this.res, next);
});

initiativesController.create = function () {
    var self = this;

    initiativesData.create ({ name: this.param('name')}, function (err ) {
        if (err) {
            console.log('Error when creating initiative');
            return;
        }

        self.redirect(self.initiativesPath());
    });
};

module.exports = initiativesController;
