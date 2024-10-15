import express from "express";
import multer from "multer";
import path from "path";
import slugify from "slugify";
import bodyParser from "body-parser";
import { importUnitGroupData } from "../controllers/unitGroupController.js";

const router = express.Router();

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

const upload = multer({ storage: storage });
router.post("/import", upload.single("file"), importUnitGroupData);

export default router;
