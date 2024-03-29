const pharmacy = require('../models/pharmacyModel');

async function addPharmacy(req, res){
    try{
        const body = req.body;
        const pharm = await pharmacy.create({
            pharmacyName: body.pharmacyName,
            pharmacyLocation: body.pharmacyLocation,
            pharmacyPhoneNumber: body.pharmacyPhoneNumber,
            pharmacyEmail: body.pharmacyEmail,
            pharmacyOpeningHours: body.pharmacyOpeningHours,
            pharmacyClosingHours: body.pharmacyClosingHours
        });
        return res.status(201).send("Pharmacy Created");
    } catch(err){
        return res.status(400).send(`error: ${err}`);
    }
}

async function getAllPharmacies(req, res){
    try{
        const pharm = await pharmacy.find({});
        if(!pharm){
            return res.status(404).send('No pharmacy found');
        }
        res.status(200).send(pharm);
    } catch(err){
        res.status(400).send(`error: ${err}`);
    }
}

async function deletePharmacy(req, res){
    try{
        const pharm = await pharmacy.findByIdAndDelete(req.params._id);
        if(!pharm){
            return res.status(404).send('Pharmacy not found');
        }
        res.status(200).send('Pharmacy deleted');
    } catch(err){
        res.status(400).send(`error: ${err}`);
    }
}   


module.exports = {
    addPharmacy,
    getAllPharmacies,
    deletePharmacy
}