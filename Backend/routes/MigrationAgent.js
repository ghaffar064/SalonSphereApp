import express from "express";
import { allAgents, createAgent } from "../controllers/MigrationAgent.js";
import slugify from "slugify";
import multer from "multer";

const router = express.Router();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./files");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

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

const upload = multer({ storage: storage });
router.post("/createAgent", upload.single("image"), createAgent);
router.get("/allAgents", allAgents);

export default router;
