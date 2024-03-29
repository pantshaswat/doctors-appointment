// controllers/appointmentsController.js
const  appointment = require("../models/appointmentModel");
const doctor = require("../models/doctors");
const emergency = require('../models/emergencyAlert');

// exports.bookAppointment = async (req, res) => {
//   try {
//     const body = req.body;

//     const newAppointment = await appointment.create({
//       userId: body.userId,
//       description: body.description,
//       location: body.location,
//       doctorId: body.doctorUsId,
//       status: 'Pending',
//       appointmentDate: "",
//     });

//     return res.status(201).json({ success: true, booking: newAppointment });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal Server Error" });
//   }
// };
exports.bookAppointment= async(req, res) =>{
  const { userId, description, location, doctorId, appointmentDate } = req.body;

  try {
    // Create a new appointment
    const newAppointment = await appointment.create({
      userId,
      description,
      location,
      doctorId,
      appointmentDate,
      status: "Pending", // Set status to Pending by default
    });

    // Save the appointment to the database


    // Send a success response
    res.status(201).json({ message: 'Appointment created successfully', newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.viewAppointments = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userBookings = await appointment.find({ userId });

    return res.status(200).json({ success: true, bookings: userBookings });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.viewAppointmentsAll = async (req, res) => {
  try {
    const allBookings = await Booking.find();

    return res.status(200).json({ success: true, bookings: allBookings });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.emergencyRequest = async (req, res) => {
  try {
    const body = req.body;

    const emergencyRequest = await emergency.create({
      userId: body.userId,
      description: body.description,
      emergencyContact: body.emergencyContact,
      location: body.location,
    });

    return res.status(201).json({ success: true, request: emergencyRequest });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
exports.getAllEmergencyRequests = async (req,res)=>{
    try {
        const allRequests = await emergency.find();
        if(!allRequests){
            return res.status(404).send('No requests found');
        }
        return res.status(200).send(allRequests);
    } catch (error) {
        return res.status(500).send(`error ${error}`);
    }
}