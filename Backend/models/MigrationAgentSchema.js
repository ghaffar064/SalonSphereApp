import mongoose from "mongoose";

// Define the MigrationAgentSchema

const MigrationAgentSchema = mongoose.Schema({
  agentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  MARN: {
    type: Number,
    required: true,
  },
  languagesSpoken: {
    type: [String],
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const MigrationAgent = mongoose.model(
  "MigrationAgent",
  MigrationAgentSchema
);
