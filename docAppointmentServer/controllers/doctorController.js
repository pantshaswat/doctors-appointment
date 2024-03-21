const doctor = require("../models/doctors");
const userModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;

//get service center
async function getAllDoctors(req, res) {
 
  try {
    const doctors = await doctor.find();
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
    const newDoctor = await doctor.findOne({ ownerUserId: user_id });
    await doctor.updateOne(
      { ownerUserId: new ObjectId(user_id) },
      { status: "Verified" }
    );
    res.status(200).send("Doctor Approved");
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function submitRequest(req, res) {
  const user_id = req.params._id;
  try {
 
    const data = req.body;
    const pastDoctor = await doctor.findOne({doctorUserId: new ObjectId(user_id)})
    if(pastDoctor){
        return res.status(400).send('Doctor already exists');
    }
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
module.exports = { submitRequest, approveDoctor, getAllDoctors };
