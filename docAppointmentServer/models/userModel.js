const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["ClientUser", "Doctor", "HealthCare"],
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;