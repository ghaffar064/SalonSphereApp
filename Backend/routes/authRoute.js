import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//Routes
//Register || Method Post
router.post("/register", registerController);
//Login || Method Post
router.post("/login", loginController);

//protect route for admin
router.get("/user-auth", requireSignIn, (req, resp) => {
  resp.status(200).send({ ok: true });
});

//protect route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, resp) => {
  resp.status(200).send({ ok: true });
});

//test
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
