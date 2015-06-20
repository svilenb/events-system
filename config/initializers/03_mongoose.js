var mongoose = require('mongoose');
var constants = require('../../app/constants');
var InitiativeModel = require(constants.rootPath + 'app/data/models/Initiative');
var SeasonModel = require(constants.rootPath + 'app/data/models/Season');
var UserModel = require(constants.rootPath + 'app/data/models/User');
var EventModel = require(constants.rootPath + 'app/data/models/Event');
var CategoryModel = require(constants.rootPath + 'app/data/models/Category');
var async = require('async');

module.exports = function(done) {
    switch (this.env) {
        case 'development':
            mongoose.connect(constants.development.db);
            break;
        case 'production':
            mongoose.connect('mongodb://mongodb.example.com/prod');
            break;
    }

    var db = mongoose.connection;

    db.on('error', function(err) {
        console.log('Database error: ' + err);
    });

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        InitiativeModel.init();
        SeasonModel.init();
        UserModel.init();
        EventModel.init();
        CategoryModel.init();

        var InitiativeData = require(constants.rootPath + 'app/data/initiatives');
        var SeasonData = require(constants.rootPath + 'app/data/seasons');
        var Userdata = require(constants.rootPath + 'app/data/users');
        var EventData = require(constants.rootPath + 'app/data/events');
        var CategoryData = require(constants.rootPath + 'app/data/categories');

        async.parallel({
                categories: CategoryData.seedInitialCategories,
                seasons: SeasonData.seedInitialSeasons,
                initiatives: InitiativeData.seedInitialInitiatives,
                users: Userdata.seedInitialUsers
            },
            function(err, results) {
                if (err) {
                    console.log(err);
                    return;
                }

                EventData.seedInitialEvents(
                    results.users,
                    results.categories,
                    results.initiatives,
                    results.seasons,
                    function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        console.log('Database up and running...');
                        done();
                    });
            });
    });
};
