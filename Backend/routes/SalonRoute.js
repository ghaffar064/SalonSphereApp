import express from "express";
import { addSalon, getSalonsByType } from '../controllers/SalonController.js';

const router = express.Router();

// Route to add a salon, with type specified in the request body
router.post("/addSalon", addSalon);

// Route to get salons, filtered by type through a query parameter
router.get("/getSalons", getSalonsByType);

export default router;
