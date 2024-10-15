import mongoose from "mongoose";

const TimeSlotSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  times: {
    type: [String],
    required: true,
  },
});

const ServiceSchema = mongoose.Schema({
  visaType: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  dateTimeSlots: {
    type: [TimeSlotSchema],
    required: true,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MigrationAgent",
    required: true,
  },
});

export const Service = mongoose.model("Service", ServiceSchema);
