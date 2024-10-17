import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./Configration/db.js";
import cors from "cors";
import path from "path";
import salonRouter from './routes/SalonRoute.js'
import bookingRouter from './routes/Booking.js'
//config
dotenv.config();
connectDB();
const app = express();

const corsConfig = {
  origin: "*",
  Credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

//simple api
app.get("/", (req, resp) => {
  resp.send({
    message: "Welcome to Salon Sphere",
  });
});

app.options("", cors(corsConfig));
//middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use('/api/salon/',salonRouter)
app.use('/api/booking',bookingRouter)
//port
const PORT = 3500 || 3600;
app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`.bgYellow.white);
});
