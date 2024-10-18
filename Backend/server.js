import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./configDB/dbConnection.js";
import authRoute from "./routes/authRoute.js";
import salonRouter from './routes/SalonRoute.js'
import bookingRouter from './routes/Booking.js'
import cors from "cors";
const app = express();

//config env
dotenv.config();
//config DB
connectDB();
//use middelwares
app.use(express.json());
app.use(cors());

//rest api
app.get("/", (req, resp) => {
  resp.send({
    message: "Welcome to salonSphere",
  });
});

//define your routes here
app.use("/api/auth", authRoute);
app.use('/api/salon/',salonRouter)
app.use('/api/booking',bookingRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This SalonSphere App is Running On ${PORT}`.bgBlue);
});
