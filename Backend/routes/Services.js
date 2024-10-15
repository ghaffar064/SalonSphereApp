import express from "express";
import { AddService, allServices } from "../controllers/Services.js";

const router = express.Router();
router.post("/addService", AddService);
router.get("/allservices", allServices);
export default router;
