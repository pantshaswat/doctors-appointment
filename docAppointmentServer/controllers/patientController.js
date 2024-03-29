const patientRecord = require('../models/patientRecord');



async function addPatientRecord(req, res){
  try{  
    const user_id = req.params._id;
     const body = req.body;
     const patientRec = await patientRecord.create({
        patientUserId: user_id,
        allocatedDepartment :body.allocatedDepartment,
        medicalCondition: body.medicalCondition,
        dateOfBirth: body.dateOfBirth,
        gender: body.gender
     });
     return res.status(201).send("Patient Record Created");
    }
     catch(err){
        return res.status(400).send(`error: ${err}`);
     }
}
async function getAllPatientRecords(req,res){
    try {
        const patientRecords = await patientRecord.find({});
        if(!patientRecords){
            return res.status(404).send('No patient found');
        }
        res.status(200).send(patientRecords);        
    } catch (error) {
        res.status(400).send(`error: ${error}`);
    }
}


async function getAmounts(req, res) {
    try {
        
        const ageBoundaries = [0, 18, 30, 50, 70, 90, 100];
// Age group 1: 0 - 18 years
// Age group 2: 19 - 30 years
// Age group 3: 31 - 50 years
// Age group 3: 51 - 70 years
// Age group 3: 71 - 90 years
// Age group 3: 91 - 100 years

        // Group by department names
        const departmentStats = await patientRecord.aggregate([
           
            {
                $group: {
                    _id: "$allocatedDepartment",
                    count: { $sum: 1 }
                }
            }
        ]).exec();

        const currentDate = new Date();

        const ageGroupStats = await patientRecord.aggregate([
            {
                $addFields: {
                    age: {
                        $dateDiff: {
                            startDate: "$dateOfBirth",
                            endDate: currentDate,
                            unit: "year"
                        }
                    }
                }
            },
            {
                $bucket: {
                    groupBy: "$age",
                    boundaries: ageBoundaries,
                    default: "100+",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            }
        ]).exec();
        

        // Group by gender
        const genderStats = await patientRecord.aggregate([
            {
                $group: {
                    _id: "$gender",
                    count: { $sum: 1 }
                }
            }
        ]).exec();

        return res.status(200).json({
            departmentStats,
            ageGroupStats,
            genderStats
        });
    } catch (error) {
        return res.status(400).send(`Error: ${error}`);
    }
}

module.exports = {
    addPatientRecord,
    getAllPatientRecords,
    getAmounts
}