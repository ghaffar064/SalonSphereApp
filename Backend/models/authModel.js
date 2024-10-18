import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone_number: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", authSchema);
