import express from "express";
import {
  isAdmin,
  isSalonOwner,
  requireSignIn,
  authenticateUser,
  requireSignInForReviews
} from "../middlewares/authMiddlewares.js";
import salonPicsUpload from "../middlewares/imagesMiddleWare.js";
import {
  createSalonProfile,
  viewSalonProfile,
  editSalonProfile,
  updateSalonProfile,
  reviewController,
  deleteSalonProfile,
  getSalonsByType
  
} from "../controllers/salonController.js";
const router = express.Router();

router.post(
  "/create-salon-profile",
  salonPicsUpload,
  authenticateUser,
  createSalonProfile,
  
);


router.get("/view-salon/:id", viewSalonProfile);


router.get("/edit-salon/:id", editSalonProfile);
router.put(
  "/update-salon-profile/:id",
  authenticateUser, 
  isSalonOwner,
  salonPicsUpload,
  updateSalonProfile
);



router.delete("/delete-salon/:id", deleteSalonProfile);

router.put("/:id/review",requireSignInForReviews, reviewController);
router.get('/getSalons', getSalonsByType);
export default router;
