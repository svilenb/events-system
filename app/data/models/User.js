var mongoose = require('mongoose');
var encryption = require('../../utilities/encryption');

module.exports.init = function() {
    var userSchema = mongoose.Schema({
        username: {
            type: String,
            required: '{PATH} is required',
            unique: true
        },
        salt: String,
        hashPass: String,
        eventPoints: {
            type: Number,
            default: 0
        },
        firstName: {
            type: String,
            required: '{PATH} is required'
        },
        lastName: {
            type: String,
            required: '{PATH} is required'
        },
        phoneNumber: String,
        email: {
            type: String,
            required: '{PATH} is required'
        },
        facebook: String,
        twitter: String,
        linkedin: String,
        googleplus: String,
        avatar: String
    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            } else {
                return false;
            }
        }
    });

    var minUsernameLength = 6;
    var maxUsernameLength = 20;

    userSchema.virtual('minUsernameLength').get(function() {
        return minUsernameLength;
    });

    userSchema.virtual('minUsernameLength').set(function(value) {
        minUsernameLength = value;
    });

    userSchema.virtual('maxUsernameLength').get(function() {
        return maxUsernameLength;
    });

    userSchema.virtual('maxUsernameLength').set(function(value) {
        maxUsernameLength = value;
    });

    userSchema.path('username').validate(function(value) {
        var correctLength = this.minUsernameLength <= value.length && value.length <= this.maxUsernameLength;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_ .';
        var correctCharacters = true;

        for (var i = 0; i < value.length; i += 1) {
            if (characters.indexOf(value[i]) === -1) {
                correctCharacters = false;
            }
        }

        return correctLength && correctCharacters;
    });

    mongoose.model('User', userSchema);
};
