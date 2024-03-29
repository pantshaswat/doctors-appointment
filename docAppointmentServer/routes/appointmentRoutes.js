const router = require("express").Router();

const {
    bookAppointment,
    viewAppointments,
    viewAppointmentsAll,
    emergencyRequest,
    getAllEmergencyRequests 
  } = require("../controllers/appointmentController");

  router.post("/bookappointment", bookAppointment);
  router.get("/viewappointment", viewAppointments);
  router.put("/viewallappointment", viewAppointmentsAll);
  router.post("/emergency", emergencyRequest);
  router.get("/allemergency", getAllEmergencyRequests);

  module.exports=router;