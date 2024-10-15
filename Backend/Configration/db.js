import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connect To The MongoDB ${connect.connection.host}`.bgYellow.white
    );
  } catch (err) {
    console.log(`Error in mongoDB connection ${err}`);
  }
};

export default connectDB;
