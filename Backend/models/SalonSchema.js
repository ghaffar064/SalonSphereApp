import mongoose from "mongoose";

const StylistSchema = new mongoose.Schema({
  name: String,
  experience: String,
  expertise: String,
  about: String,
  id: Number,
  dateTimeSlots: [
    {
      date: String,
      times: [String],
    },
  ],
});

const ServiceOptionSchema = new mongoose.Schema({
  name: String,
  price: String,
});

const ServiceSchema = new mongoose.Schema({
  type: String,
  options: [ServiceOptionSchema],
});

const SalonSchema = new mongoose.Schema({
  salonId: String,
  name: String,
  reviews: Object,
  description: String,
  image: String,
  address: String,
  location: {
    latitude: String,
    longitude: String,
  },
  salonType: { // Updated field to support an array of types
    type: [String], // Now an array of strings
    enum: ['Hair Salon', 'Nail Salon', 'Home Service', 'Make Up', 'Skin Care', 'Spa'], // Allowed values
    required: true,
  },
  about: String,
  stylists: [StylistSchema],
  services: [ServiceSchema],
});

export const Salon = mongoose.model("Salon", SalonSchema);
