const router = require('express').Router();

const{addPharmacy, getAllPharmacies, deletePharmacy} = require('../controllers/pharmacyController');

router.post('/addPharmacy', addPharmacy);
router.get('/getAllPharmacies', getAllPharmacies);
router.delete('/deletePharmacy/:_id', deletePharmacy);

module.exports = router;