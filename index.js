const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// console.log(process.env.Email, process.env.Pass);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Pass,
  },
});

app.get("/", (req, res) => {
  res.send("Portfolio server is running");
});

app.post("/sendEmail", (req, res) => {
  const { userEmail, subject, message } = req.body;

  const mailOptions = {
    from: userEmail,
    to: "mahfuzurrahman4044@gmail.com",
    subject: subject,
    text: `From: ${userEmail}\n\n${message}`,
  };
  //   console.log(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
