const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  path: {
    type: String,
    required: [true, "Path is required."],
  },
  img: {
    type: String,
  },
  category: String,
  user: mongoose.Schema.Types.ObjectId,
  date: Date,
  pages: Number,
  company: String,
  isUploaded: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("File", fileSchema);
