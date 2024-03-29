
const nodemailer = require("nodemailer");
require('dotenv').config()
exports.transporter = () =>
{
    return transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });}