import mongoose from "mongoose";

// Define the UnitGroup schema
const UnitGroupSchema = new mongoose.Schema({
  unitGroupCode: {
    type: String,
    required: true,
    unique: true,
  },
  unitGroup: {
    type: String,
    required: true,
  },
  anzscoCodesInUnitGroup: [
    {
      type: String, // Each entry in this array is a string (ANZSCO code)
      required: true,
    },
  ],
  occupationsInUnitGroup: [
    {
      type: String, // Each entry in this array is a string (Occupation)
      required: true,
    },
  ],
  unitGroupDescription: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: String,
      required: true,
    },
  ],
  indicativeSkillLevel: [
    {
      type: String,
      required: true,
    },
  ],
});

export const UnitGroup = mongoose.model("UnitGroup", UnitGroupSchema);
