const router = require('express').Router();

const{addBloodBank, getAllBloodBanks, deleteBloodBank} = require('../controllers/bloodBankController');

router.post('/addBloodBank', addBloodBank);
router.get('/getAllBloodBanks', getAllBloodBanks);
router.delete('/deleteBloodBank/:_id', deleteBloodBank);

module.exports = router;