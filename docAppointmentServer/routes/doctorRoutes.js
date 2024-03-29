const express = require('express')
const router = express.Router()

const {submitRequest, approveDoctor, getAllDoctors, getDoctorByUserId} = require('../controllers/doctorController');

router.post('/submitRequest/:_id', submitRequest);
router.put('/approve/:_id', approveDoctor);
router.get('/getAll',getAllDoctors)
router.get('/getDoctorByUserId/:_id' , getDoctorByUserId);

module.exports = router;