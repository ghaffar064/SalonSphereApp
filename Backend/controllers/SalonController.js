import { Salon } from '../models/SalonSchema.js';

// Function to add a salon with type specified in the request body
export const addSalon = async (req, res) => {
  try {
    const {
      salonId,
      name,
      reviews,
      description,
      image,
      address,
      location,
      salonType, // salonType is now coming from the request body
      fillheart,
      about,
      stylists,
      services,
    } = req.body;

    // Create a new salon document
    const newSalon = new Salon({
      salonId,
      name,
      reviews,
      description,
      image,
      address,
      location,
      salonType, // Use the salonType provided in the request body
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
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to get all salons by type
export const getSalonsByType = async (req, res) => {
  try {
    const { salonType } = req.query; // Get the salon type from the query parameters

    // Fetch all salon documents matching the specified type from the database
    const salons = await Salon.find({ salonType });

    // Return a success response with the list of salons
    res.status(200).json(salons);
  } catch (error) {
    // Return an error response in case of a server error
    res.status(500).json({ message: 'Server error', error });
  }
};
