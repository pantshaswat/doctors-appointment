const doctor = require("../models/doctors");
const userModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

//get service center
async function getAllDoctors(req, res) {
 
  try {
    const doctors = await doctor.find().populate('doctorUserId', 'fullName');
    res.status(200).send(doctors);
  } catch (error) {
    console.error("Error getting service center:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function approveDoctor(req, res) {
  const user_id = req.params._id;
  try {
    const user = await userModel.findOne({ _id: new ObjectId(user_id) });
    if (!user) {
      return res.status(404).send("User not found");
    }
    //change the field of role update
    await userModel.updateOne(
      { _id: new ObjectId(user_id) },
      { role: "Doctor" }
    );
    const center = await doctor.findOne({ doctorUserId: user_id });
    await doctor.updateOne(
      { doctorUserId: new ObjectId(user_id) },
      { status: "Verified" }
    );
    res.status(200).send("Service center approved");
  } catch (e) {
    res.status(500).send(e.message);
  }
}


async function getDoctorByUserId(req, res) {
  try {
    const userId = req.params._id;
    const doctorRecord = await doctor.findOne({ doctorUserId: userId });

    if (!doctorRecord) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    return res.status(200).json(doctorRecord);
  } catch (error) {
    console.error('Error retrieving doctor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// async function getDoctorByUserId(req,res){
//   try {
//     const _id = req.params._id;
//     const doctorr = await doctor.findOne({doctorId: _id});
//     return res.status(200).send(doctorr)
//   } catch (error) {
//     console.log('error getting doctor')
//     return res.status(400).send(error)
//   }
// }


async function submitRequest(req, res) {
  const user_id = req.params._id;
  try {
 
    const data = req.body;
    const doctorData = await doctor.create({
      doctorUserId: user_id,
      licenseNumber: data.licenseNumber,
      qualification: data.qualification,
      specialization: data.specialization,
    });

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { submitRequest, approveDoctor, getAllDoctors , getDoctorByUserId};
