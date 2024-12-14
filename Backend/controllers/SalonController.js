import { Salon } from '../models/SalonSchema.js';
import userModel from '../models/authModel.js';


// Function to add a salon with type specified in the request body


export const addSalon = async (req, res) => {
  try {
    const {
      salonId,
      name,
      reviews,
      description,
      address,
      location,
      salonType,
      fillheart,
      about,
      stylists,
      services,
    } = req.body;

    // Validate required fields
    if (!salonId || !name || !salonType || !services) {
      return res.status(400).json({
        message: 'salonId, name, salonType, and services are required.',
      });
    }

    // Safely extract uploaded file paths
    const coverImage = req.files?.coverImage
      ? `/uploads/${req.files.coverImage[0].filename}`
      : null;

    const images = req.files?.images
      ? req.files.images.map((file) => `/uploads/${file.filename}`)
      : [];

    // Create a new salon document
    const newSalon = new Salon({
      salonId,
      name,
      reviews,
      description,
      coverImage,
      images,
      address,
      location,
      salonType,
      fillheart,
      about,
      stylists,
      services,
    });

    // Save the salon to the database
    await newSalon.save();

    // Return a success response
    res.status(201).json({ message: 'Salon added successfully', salon: newSalon });
  } catch (error) {
    console.error('Error adding salon:', error);
    res.status(500).json({ message: 'Server error while adding salon', error });
  }
};
// Function to get all salons by type
export const getSalonsByType = async (req, res) => {
  try {
    const { salonType } = req.query; // Get the salon type from the query parameters

    // Check if salonType is provided
    if (!salonType) {
      return res.status(400).json({ message: 'salonType query parameter is required.' });
    }

    // Split the salonType into an array if it contains multiple types
    const types = Array.isArray(salonType) ? salonType : [salonType];

    // Fetch salons matching at least one of the types specified in the array
    const salons = await Salon.find({ salonType: { $in: types } });

    // Return a success response with the list of salons
    res.status(200).json(salons);
  } catch (error) {
    // Return an error response in case of a server error
    res.status(500).json({ message: 'Server error while fetching salons', error });
  }
};
export const reviewController = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    // find product
    const salon = await Salon.findById(req.params.id);
    const user = await userModel.findById(req.user._id)
   console.log(user);
    // check previous review
    const alreadyReviewed = salon.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Alredy Reviewed",
      });
    }
    
    const review = {
      name: user.first_name,
      rating: Number(rating),
      comment,
      user: user._id,
    };
    // passing review object to reviews array
    salon.reviews.push(review);
    // number or reviews
    salon.numReviews = salon.reviews.length;
    salon.rating =
      salon.reviews.reduce((acc, item) => item.rating + acc, 0) /
      salon.reviews.length;
    // save
    await salon.save();
    res.status(200).send({
      success: true,
      message: "Review Added!",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Review Comment API",
      error,
    });
  }
};