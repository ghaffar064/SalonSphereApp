import mongoose from "mongoose";
const contactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    visa_type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("contactquries", contactFormSchema);
