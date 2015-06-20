var mongoose = require("mongoose");

module.exports.init = function () {
    var seasonSchema = mongoose.Schema({
      name: {
        type: String,
        required: "{PATH} is required",
        unique: true
      }
    });

    mongoose.model("Season", seasonSchema);
};
