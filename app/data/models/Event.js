var mongoose = require('mongoose');
var REQUIRED = "{PATH} is required";
var Schema = mongoose.Schema;

module.exports.init = function () {
    var eventSchema = mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            required: REQUIRED,
            ref: "User"
        },
        category: {
            type: Schema.Types.ObjectId,
            required: REQUIRED,
            ref: "Category"
        },
        title: {
            type: String,
            required: REQUIRED
        },
        description: {
            type: String,
            required: REQUIRED
        },
        location: {
            latitude: Number,
            longitude: Number
        },
        type: {
            type: {
                initiative: { type: Schema.Types.ObjectId, required: REQUIRED, ref: 'Initiative'},
                season: { type: Schema.Types.ObjectId, required: REQUIRED, ref: 'Season'}
            },
            required: REQUIRED
        },
        date: {
            type: {},
            default: new Date(),
            required: REQUIRED
        },
        evaluation: {
            type: Number,
            required: REQUIRED
        },
        comments: [String]
    });

    mongoose.model('Event', eventSchema);
};
