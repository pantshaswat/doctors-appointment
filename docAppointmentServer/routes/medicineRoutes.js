const router = require('express').Router()
const {addNewMedicine,updateExistingMedicine,getAllMedicines} = require('../controllers/medicineController')


router.post('/add',addNewMedicine);
router.put('/update',updateExistingMedicine);
router.get('/getAll',getAllMedicines);

module.exports = router;