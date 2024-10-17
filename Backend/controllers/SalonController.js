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

    // Validate required fields
    if (!salonId || !name || !salonType || !services) {
      return res.status(400).json({ message: 'salonId, name, salonType, and services are required.' });
    }

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
