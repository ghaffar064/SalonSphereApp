import express from "express";
import {
  adminPanel,
  adminController,
  deleteUser,
  getAdmins,
  updateAdminRole,
  viewBlogs,
  deleteBlog,
  viewBlog,
  viewContactUsForm,
} from "../controllers/admin.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/admin", adminPanel);

//getting all user on admin panel
router.get("/get-users", adminController);

//getting all admin on admin panel
router.get("/get-admins", getAdmins);

//delete specific user through id
router.delete("/delete-user/:id", deleteUser);

//remove admin
router.put("/remove-admin/:id", updateAdminRole);

//routes related blog section
router.get("/view-blogs", viewBlogs);
router.delete("/delete-blog/:id", deleteBlog);
router.get("/view-blog/:id", viewBlog);
//view blods
router.get("/view-contact-forms", viewContactUsForm);

export default router;
