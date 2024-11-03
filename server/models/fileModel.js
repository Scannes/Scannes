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
    required: [true, "Image is required."],
  },
  category: String,
  user: mongoose.Schema.Types.ObjectId,
  date: Date,
  pages: Number,
  company: String,
});

module.exports = mongoose.model("File", fileSchema);
