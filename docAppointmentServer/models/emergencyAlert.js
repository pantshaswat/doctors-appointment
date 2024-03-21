const mongoose = require("mongoose");


const emergencyAlert = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
    },
    emergencyContact:{
      type: String,
    },
    location:{
        type:[Number],
    },
  },
  {
    timestamps: true,
  }
);

const emergency = mongoose.model("emergencyAlert", emergencyAlert);

module.exports = emergency;
