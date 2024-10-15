import express from "express";
import multer from "multer";
import slugify from "slugify";
import { contactFormController } from "../controllers/formController.js";

import { blogPostController } from "../controllers/admin.js";

//router object
const router = express.Router();

//attach file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = originalName.substring(originalName.lastIndexOf("."));
    const name = originalName.substring(0, originalName.lastIndexOf("."));
    const slugifiedName = slugify(name, { lower: true, strict: true });
    cb(null, `${timestamp}-${slugifiedName}${extension}`);
  },
});

const upload = multer({ storage });

//Routes
//contact Form || Method Post
router.post("/contact-form", upload.single("file"), contactFormController);
//contact Form || Method Post
router.post("/blog-post", upload.single("img"), blogPostController);

export default router;
