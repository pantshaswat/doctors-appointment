const express = require("express");
const app = express();
const medicine = require("./models/medicines");
// const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Database = require("./services/mongoConnect");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const { getMedicineById } = require("./controllers/medicineController");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
// Assuming PORT is defined somewhere in your code
const PORT = 3000;
// app.use(
//   cors({
//     origin: "http://localhost:5173", //frontend url
//     credentials: true,
//   })
// );
//!ROUTES
const authRoutes = require("./routes/authRoutes");
const patientRecordRoutes = require("./routes/patientRecordRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const pharmaRoutes = require("./routes/pharmacyRoutes");
const bloodBankRoutes = require("./routes/bloodBankRoutes");




app.use(express.raw());
app.use(bodyParser.urlencoded({ extended: true })); // to support URL
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(cookieParser(null, { sameSite: "None" }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const medicineWatch = medicine.watch();

medicineWatch.on("change", async (change) => {
  console.log("Changed:", change);
  if (
    change.ns.coll === "medicines" &&
    change.updateDescription.updatedFields.amount < 10
  ) {
    const medicine = await getMedicineById(change.documentKey._id);
    const info = await transporter.sendMail({
      from: "Medical Equipment <pantshaswat@gmail.com>", // sender address
      to: "pantshaswat61@gmail.com", // list of receivers
      subject: "Medical equipment shortage", // Subject line
      text: "Medical Equipment sortage alert!!", // plain text body
      html: `<b>Medical equipment shortage of: ${medicine.name}, remaining: ${medicine.amount}</b>`, // html body
    });
  }
});

// app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("ff");
});
app.use("/auth", authRoutes);
app.use("/patient", patientRecordRoutes);
app.use("/medicine", medicineRoutes)
app.use("/pharmacy", pharmaRoutes);
app.use("/bloodBank", bloodBankRoutes);

// Connect to the database and start the server
;(async () => {
  try {
    await Database.connect();
    app.listen(PORT, () => {
      console.log("Server is up on port " + PORT);
      console.log("http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
