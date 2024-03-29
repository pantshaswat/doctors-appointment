const router = require("express").Router();

const {
    bookAppointment,
    viewAppointments,
    viewAppointmentsAll,
    emergencyRequest,
    getAllEmergencyRequests ,
    approveOrRejectAppointment
  } = require("../controllers/appointmentController");

  router.post("/bookappointment", bookAppointment);
  router.get("/viewappointment", viewAppointments);
  router.put("/viewallappointment", viewAppointmentsAll);
  router.post("/emergency", emergencyRequest);
  router.get("/allemergency", getAllEmergencyRequests);
  router.put("/approveorreject", approveOrRejectAppointment)

  module.exports = router;