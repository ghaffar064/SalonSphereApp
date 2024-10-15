import mongoose from "mongoose";

// Define the OccupationSchema
const OccupationSchema = new mongoose.Schema({
  occupation: {
    type: String,
    required: true,
  },
  anzscoCode: {
    type: mongoose.Schema.Types.ObjectId, // Reference to AnzscoCode model
    ref: "AnzscoCode", // Reference to AnzscoCode document
    required: true, // Ensures a valid anzscoCode is provided and not null
  },
  assessingAuthority: {
    type: [String], // Array of strings to handle multiple authorities
    required: true,
  },
  skillsList: {
    type: String, // Single string for skills list
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Occupation model
export const Occupation = mongoose.model("Occupation", OccupationSchema);
