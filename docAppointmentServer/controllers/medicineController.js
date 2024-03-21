const medicine = require('../models/medicines');
const ObjectId = require("mongoose").Types.ObjectId;
exports.addNewMedicine = async (req,res)=>{
    try {
        const body = req.body;
        const newMedicine = await medicine.create({
            name: body.name,
            brand: body.brand,
            amount: body.amount
        });
        return res.status(201).send('Medicine Added');
    } catch (error) {
        return res.status(500).send(`error: ${error}`);
        }
}
exports.updateExistingMedicine = async (req,res)=>{
    try {
// send request in this format
        // {
        //     _id: 585d523f6436437f,
        //     method: 'add' or 'remove',
        //     amount: 4
        // }
        const body = req.body;
        const medicineId = body._id;
        if (body.method === 'add') {
            await medicine.updateOne(
                { _id: new ObjectId(medicineId) },
                { $inc: { amount: body.amount } }
            );
            return res.status(200).send('Updated');
        } else if (body.method === 'remove') {
            await medicine.updateOne(
                { _id: new ObjectId(medicineId) },
                { $inc: { amount: -body.amount } } // Corrected $inc syntax
            );
            return res.status(200).send('Updated');
        } else {
            return res.status(400).send('Invalid method');
        }
    } catch (error) {
        
    }
}
exports.getAllMedicines = async(req,res)=>{
    try {
        const medicines = await medicine.find();
        if(!medicine) return res.send(404).send('No medicines found')
        return res.status(200).send(medicines);
    } catch (error) {
        return res.status(500).send(`error: ${error}`);
    }
}
exports.getMedicineById= async(id)=>{
    try {
        const medicines = await medicine.findOne({_id: id})
        if(!medicine) return res.send(404).send('medicines Not found')
        return medicines;
    } catch (error) {
        console.log(error)
        return;
    }
}



