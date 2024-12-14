import JWT from "jsonwebtoken";
import userModel from "../models/authModel.js";
import salonModel from "../models/salonAuthModel.js";
//protect routes on token base
// export const requireSignIn = async (req, resp, next) => {
//   try {
//     const decode = JWT.verify(req.headers.authorization, process.env.JWT_KEY);
//     req.user = decode;
    
//     next();
//   } catch (err) {
//     console.log(err);
//     resp.status(401).send({
//       success: false,
//       message: "Unauthorized Access",
//     });
//   }
// };


export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required.",
      });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing or malformed.",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_KEY); // Verify token
    req.user = decoded; // Attach decoded token to `req.user`

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
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
