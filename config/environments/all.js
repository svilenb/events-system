var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var busboy = require('connect-busboy');
var poweredBy = require('connect-powered-by');
var logger = require('morgan');
var favicon = require('serve-favicon');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var passport = require('passport');

module.exports = function() {
    // Warn of version mismatch between global "lcm" binary and local installation
    // of Locomotive.
    var self = this;
    if (this.version !== require('locomotive').version) {
        console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
    }

    if ('development' === this.env) {
        this.use(logger('dev'));
        this.use(errorHandler());
    }

    this.use(poweredBy('Locomotive'));
    this.use(favicon(__dirname + '/../../public/favicon.ico'));
    this.use(express.static(__dirname + '/../../public'));
    this.use(cookieParser());
    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({
        extended: true
    }));
    this.use(busboy({
        immediate: false
    }));
    this.use(session({
        secret: 'magic unicorns',
        resave: true,
        saveUninitialized: true
    }));
    this.use(passport.initialize());
    this.use(passport.session());
    this.use(methodOverride('X-HTTP-Method-Override'));
    this.use(function(req, res, next) {
        if (req.session.error) {
            var msg = req.session.error;
            req.session.error = undefined;
            self.locals.errorMessage = msg;
        } else {
            self.locals.errorMessage = undefined;
        }

        next();
    });
    this.use(function(req, res, next) {
        if (req.user) {
            self.locals.currentUser = req.user;
        } else {
            self.locals.currentUser = undefined;
        }

        next();
    });
    this.use(this.router);


    if ('development' === this.env) {
        this.use(errorHandler());
    }
};
