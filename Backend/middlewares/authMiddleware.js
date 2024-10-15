import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

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
