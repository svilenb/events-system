var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development: {
        db: 'mongodb://localhost:27017/academyevents',
        port: process.env.PORT || 3001
    },
    rootPath: rootPath
};
