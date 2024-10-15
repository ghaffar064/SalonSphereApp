import express from "express";

import { userViewBlogs, userViewBlog } from "../controllers/userController.js";

const router = express.Router();
router.get("/view-blogs", userViewBlogs);

router.get("/view-blog/:id", userViewBlog);

export default router;
