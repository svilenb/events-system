var mongoose = require("mongoose");

module.exports.init = function () {
    var categorySchema = mongoose.Schema({
      name: {
        type: String,
        required: "{PATH} is required",
        unique: true
      }
    });

    mongoose.model("Category", categorySchema);
};
