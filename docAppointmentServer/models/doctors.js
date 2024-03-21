const mongoose = require("mongoose");

const doctorModel = new mongoose.Schema({
  doctorUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  licenseNumber: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  specialization: {
    type: Number,
    required: true,
  },
  status:{
    type: String,
    enum:['Pending','Verified'],
    default: 'Pending'
  }
});

const doctor = mongoose.model("doctor", doctorModel);

module.exports = doctor;
