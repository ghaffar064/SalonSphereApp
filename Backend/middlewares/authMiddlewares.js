import JWT from "jsonwebtoken";
import userModel from "../models/authModel.js";
import salonModel from "../models/salonAuthModel.js";
//protect routes on token base
export const requireSignIn = async (req, resp, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_KEY);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    resp.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

//admin access
export const isAdmin = async (req, resp, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    resp.status(401).send({
      success: false,
      message: "Error In Admin Middleware",
    });
  }
};

//salon owner access
export const isSalonOwner = async (req, resp, next) => {
  try {
    const user = await salonModel.findById(req.user._id);

    if (user.role !== 2) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    resp.status(401).send({
      success: false,
      message: "Error In Salon Middleware",
    });
  }
};
