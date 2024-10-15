import mongoose from "mongoose";

// Define the AnzscoCode schema
const AnzscoCodeSchema = new mongoose.Schema({
  anzscoCode: {
    type: String,
    required: true,
    unique: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  majorGroup: {
    type: String,
    required: true,
  },
  subMajorGroup: {
    type: String,
    required: true,
  },
  minorGroup: {
    type: String,
    required: true,
  },
  // Reference to the UnitGroup model
  unitGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UnitGroup",
    required: true,
  },
  majorGroupCode: {
    type: String,
    required: true,
  },
  subMajorGroupCode: {
    type: String,
    required: true,
  },
  minorGroupCode: {
    type: String,
    required: true, // Ensure this field is required
  },
});

export const AnzscoCode = mongoose.model("AnzscoCode", AnzscoCodeSchema);
