import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, resp) => {
  try {
    const { first_name, last_name, email, phone_number, password } = req.body;
    //validations
    if (!first_name) {
      return resp.send({ message: "First Name Is Required" });
    }
    if (!last_name) {
      return resp.send({ message: "Last Name Is Required" });
    }
    if (!email) {
      return resp.send({ message: "Email Is Required" });
    }
    if (!phone_number) {
      return resp.send({ message: "Phone Number Is Required" });
    }
    if (!password) {
      return resp.send({ message: "Password Is Required" });
    }

    //condition for existing user
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return resp.status(200).send({
        success: false,
        message: "Email Is Already Register Please Login",
      });
    }
    //password save into hash formate
    const hashedPassword = await hashPassword(password);
    //save user info into db
    const user = await new userModel({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    }).save();
    resp.status(201).send({
      success: true,
      message: "User Register SuccessFully",
      user,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error In Registration",
      err,
    });
  }
};

//login controller
export const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return resp.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user and  password
    const user = await userModel.findOne({ email });
    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return resp.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //JWT TOKEN
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    resp.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        first_name: user.first_name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error In Login",
      err,
    });
  }
};

//test controller
export const testController = async (req, resp) => {
  resp.send("protected route");
};
