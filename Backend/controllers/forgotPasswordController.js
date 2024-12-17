import userModel from '../models/authModel.js'
import nodemailer from "nodemailer";
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
export const forgotPassword = async(req,res)=>{
    const email = req.body
    if (!email) {
        return res.send({ error: "Email Is Required " });
      }
   
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(200).send({
            success: false,
            message: "User does not exist ",
          });
    }
    else{

        const mailOptions = {
            from: process.env.USER1,
            to: ["ghaffar064@gmail.com"], // Main recipient
      
            replyTo: email,
            subject: "OTP for Salon Sphere",
            text: `
             
            `,
           
          };
          try {
            const info = await transporter.sendMail(mailOptions);
            
            return res.status(201).send({
              success: true,
              message: "We have send you verification code ",
              
            });
          } catch (error) {
            console.error("Error while sending email:", error);
            return res.status(500).send({
              success: false,
              message: "Failed to send to otp",
              error: error.message,
            });
          }
        } 
      
    }



