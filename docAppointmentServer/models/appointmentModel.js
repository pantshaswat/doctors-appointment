const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
    },
    location:{
        type:String,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    status:{
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    },
    appointmentDate:{
        type: Date,
        default:""
    }
  },
  {
    timestamps: true,
  }
);

const appointment = mongoose.model("appointment", appointmentSchema);

module.exports = appointment;
