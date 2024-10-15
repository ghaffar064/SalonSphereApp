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
  salonType: { // New field added here
    type: String,
    enum: ['hair', 'nail','Home Service','Make Up', 'Skin Care','Spa','Home Service'], // Limit values to 'hair' or 'nail'
    required: true,
  },
  about: String,
  stylists: [StylistSchema],
  services: [ServiceSchema],
});

export const Salon = mongoose.model("Salon", SalonSchema);
