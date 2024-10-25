import express from 'express';
import { addSalon, getSalonsByType } from '../controllers/SalonController.js';
import salonUpload from '../middlewares/multer.js'; // Import multer middleware

const router = express.Router();

// Route to add a salon with images
router.post('/addSalon', salonUpload, addSalon);

// Route to get salons filtered by type
router.get('/getSalons', getSalonsByType);

export default router;
