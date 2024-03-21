const userModel = require("../models/userModel");
const ObjectId = require("mongoose").Types.ObjectId;
const doctor = require('../models/doctors')
const md5 = require("md5");
const { createJwt } = require("../middlewares/jwtAuthMiddleware");

async function register(req, res) {
  const body = req.body;
  console.log("Received data:", req.body);

  if (!(body.email && body.password && body.fullName && body.role)) {
    res.status(400).send("All input required");
  }
  const email = body.email;
  const oldEmail = await userModel.findOne({ email });
  if (oldEmail) {
    return res.status(409).send("Email already used");
  }
  const md5Password = md5(body.password);
  const user = await userModel.create({
    email: body.email,
    password: md5Password,
    fullName: body.fullName,
    phoneNumber: body.phoneNumber ?? "",
    role: body.role,
  });
  return res.status(201).send(user);
}

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("All input are required");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  const password_check = md5(password) === user.password;

  if (!password_check) {
    return res.status(400).send("Invalid Credentialsss");
  }

  const token = createJwt(user);
  console.log(token);
  return res
    .status(201)
    .cookie("token", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: false,
    })
    .send(user);
}
async function signOut(req, res) {
  return res.status(201).clearCookie("token").send("logged out");
}

//a controller to fetch all users
async function getAllUsers(req, res) {
  const users = await userModel.find({});
  return res.status(200).send(users);
}

async function count(req, res) {
  try {
    const userCounts = await userModel.aggregate([
           
      {
          $group: {
              _id: "$role",
              count: { $sum: 1 }
          }
      }
  ]).exec();
  
    res.json(userCounts);
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


async function deleteUser(req,res){
  try {
    
    const userId = req.params._id;
    
    await userModel.deleteOne({_id: new ObjectId(userId)});
    const user = await userModel.findById({userId})
    if(user.role === 'Doctor'){
      await doctor.deleteOne({doctorUserId: new ObjectId(userId)})
    }
    return res.send('User deleted successfully');
  } catch (error) {
    return res.send(`Error deleting user ${error}`);
  }
}

module.exports = {
  register,
  signIn,
  signOut,
  getAllUsers,
  count,
  deleteUser
};
