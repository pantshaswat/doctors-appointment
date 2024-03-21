const express = require("express");
const router = express.Router();

const {  addPatientRecord,
    getAllPatientRecords,
    getAmounts
} = require('../controllers/patientController');

router.post('/add',addPatientRecord);
router.get('/getAll',getAllPatientRecords);
router.get('/getAmounts',getAmounts);

module.exports = router;