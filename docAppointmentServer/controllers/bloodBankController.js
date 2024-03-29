const bloodBank = require('../models/bloodBankModel');

async function addBloodBank(req, res){
    try{
        const body = req.body;
        const blood = await bloodBank.create({
            bloodBankName: body.bloodBankName,
            bloodBankLocation: body.bloodBankLocation,
            bloodBankPhoneNumber: body.bloodBankPhoneNumber,
            bloodBankEmail: body.bloodBankEmail,
            bloodBankOpeningHours: body.bloodBankOpeningHours,
            bloodBankClosingHours: body.bloodBankClosingHours
        });
        return res.status(201).send("Blood Bank Created");
    } catch(err){
        return res.status(400).send(`error: ${err}`);
    }
}

async function getAllBloodBanks(req, res){
    try{
        const blood = await bloodBank.find({});
        if(!blood){
            return res.status(404).send('No blood bank found');
        }
        res.status(200).send(blood);
    } catch(err){
        res.status(400).send(`error: ${err}`);
    }
}

async function deleteBloodBank(req, res){
    try{
        const blood = await bloodBank.findByIdAndDelete(req.params._id);
        if(!blood){
            return res.status(404).send('Blood Bank not found');
        }
        res.status(200).send('Blood Bank deleted');
    } catch(err){
        res.status(400).send(`error: ${err}`);
    }
}

module.exports = {
    addBloodBank,
    getAllBloodBanks,
    deleteBloodBank
}