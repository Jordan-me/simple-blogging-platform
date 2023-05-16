const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  imgUrl: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
// Users
