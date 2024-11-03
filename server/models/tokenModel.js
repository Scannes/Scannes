const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
