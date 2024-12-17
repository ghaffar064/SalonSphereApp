import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./configDB/dbConnection.js";
import authRoute from "./routes/authRoute.js";
import salonRouter from './routes/SalonRoute.js'
import bookingRouter from './routes/Booking.js'
import userBookingRouter from './routes/UserBooking.js'
import forgotPasswordRouter from './routes/forgotPassword.js'
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//config env
dotenv.config();
//config DB
connectDB();
//use middelwares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
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
app.use('/api/userBooking',userBookingRouter)
app.use('/api/forgot',forgotPasswordRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This SalonSphere App is Running On ${PORT}`.bgBlue);
});
