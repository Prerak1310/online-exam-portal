const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student", // all users default to student
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

