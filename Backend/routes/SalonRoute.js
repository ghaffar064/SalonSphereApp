import express from 'express';
import { addSalon, getSalonsByType,reviewController } from '../controllers/SalonController.js';
import salonUpload from '../middlewares/multer.js'; // Import multer middleware
import {
    
    requireSignIn,
  } from "../middlewares/authMiddlewares.js";
const router = express.Router();

// Route to add a salon with images
router.post('/addSalon', salonUpload, addSalon);

// Route to get salons filtered by type
router.get('/getSalons', getSalonsByType);

router.put("/:id/review",requireSignIn, reviewController);

export default router;
