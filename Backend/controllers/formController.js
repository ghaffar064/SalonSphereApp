import nodemailer from "nodemailer";
import contactUsModel from "../models/contactUsModel.js";
import dotenv from "dotenv";

dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  tls: {
    ciphers: "SSLv3",
  },
  port: 587,
  auth: {
    user: process.env.USER1, // Email address
    pass: process.env.PASS_KEY, // Password or app-specific key
  },
});

export const contactFormController = async (req, resp) => {
  try {
    const { name, email, phone_number, visa_type, message } = req.body;

    // Validations
    if (!name || !email || !phone_number || !visa_type || !message) {
      return resp.status(400).send({ message: "All fields are required" });
    }

    const contactData = {
      name,
      email,
      phone_number,
      visa_type,
      message,
    };

    // Check if there's a file uploaded
    if (req.file) {
      contactData.file = req.file.filename; // Ensure this is safely handled
    }

    const contactQuery = await new contactUsModel(contactData).save();

    // Prepare email content
    const mailOptions = {
      from: process.env.USER1,
      to: ["shahbazgurmani786@gmail.com"], // Main recipient

      replyTo: email,
      subject: "New Contact Us Form Submission",
      text: `
        You have a new query from your website Real Migration and Education:
    
        Name: ${name}
        Email: ${email}
        Phone Number: ${phone_number}
        Visa Type: ${visa_type}
        Message: ${message}
      `,
      attachments: req.file
        ? [{ filename: req.file.originalname, path: req.file.path }]
        : [],
    };

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      // console.log("Email sent: " + info.response);
      return resp.status(201).send({
        success: true,
        message: "Form has been submitted  successfully",
        contactQuery,
      });
    } catch (error) {
      console.error("Error while sending email:", error);
      return resp.status(500).send({
        success: false,
        message: "Failed to send Contact Form",
        error: error.message,
      });
    }
  } catch (err) {
    console.error("Error in contactFormController:", err);
    resp.status(500).send({
      success: false,
      message: "There was a server issue in form submission.",

      error: err.message,
    });
  }
};
