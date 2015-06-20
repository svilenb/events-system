var mongoose = require("mongoose");

module.exports.init = function() {
    var initiativeSchema = mongoose.Schema({
        name: {
            type: String,
            required: "{PATH} is required",
            unique: true
        }
    });

    mongoose.model("Initiative", initiativeSchema);
};
