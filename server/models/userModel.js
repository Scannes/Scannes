const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const user = mongoose.Schema({
  email: {
    type: String,
    unique: [true, "A user with this email already exists."],
    required: [true, "Email is required to create account."],
    validate: [validator.isEmail, "Email is invalid."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [7, "Password must at least be 7 characters long"],
  },
  name: {
    type: String,
    required: [true, "Please provide an organization name"],
  },
  role: {
    type: String,
    enum: ["admin", "staff", "user"],
    default: "user",
  },
});
user.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

user.methods.comparePasswords = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", user);
module.exports = User;
