import Stripe from "stripe";
import { Booking } from "../models/BookingSchema.js";

const stripe = new Stripe("sk_test_51PIFiAFdq3SMwAKa5PSG4mWWwsyVJap6XCXFhv6ofUwAjZWXUPn6IS5uKPtmgrndnDNKSCGJvov1mEZtaOk6GPdh00dnsTmIuQ");

// Helper function to calculate total price from selected services
const calculateTotalPrice = (selectedServices) => {
  return selectedServices.reduce((total, serviceObj) => {
    const priceString = serviceObj.price; 
    return total + (priceString ? parseFloat(priceString) : 0);
  }, 0) * 100; // Convert to cents
};

// Checkout endpoint
export const Checkout = async (req, res) => {
  try {
    const {
      salonId,
      salonName,
      selectedServices,
      selectedStylist,
      selectedDate,
      selectedTime,
      customerFirstName,
      customerLastName,
      customerPhoneNumber,
      customerEmail,
    } = req.body;

    console.log("Received salonName:", salonName);

    // Normalize selectedServices to always be an array of objects with price
    const servicesArray = Object.keys(selectedServices).map(serviceType => {
      const serviceDetail = selectedServices[serviceType];
      return {
        name: serviceDetail.name,
        price: serviceDetail.price,
      };
    });

    // Check if a similar booking already exists
    const existingBooking = await Booking.findOne({
      salonId,
      selectedStylist,
      selectedDate,
      selectedTime,
      customerEmail,
    });

    if (existingBooking) {
      return res.status(200).json({
        success: false,
        msg: "Booking already exists",
        bookingId: existingBooking._id,
      });
    }

    // Calculate total price
    const totalPriceInCents = calculateTotalPrice(servicesArray);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:3000/appointment?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/checkout-cancel",
      line_items: servicesArray.map((service) => ({
        price_data: {
          currency: "usd",
          unit_amount: totalPriceInCents,
          product_data: {
            name: service.name,
          },
        },
        quantity: 1,
      })),
      metadata: {
        salonId,
        salonName,
        selectedStylist,
        selectedDate,
        selectedTime,
        customerFirstName,
        customerLastName,
        customerPhoneNumber,
        customerEmail,
      },
      payment_intent_data: {
        description: `Service Booking at ${salonName || "Default Salon Name"}`,
        metadata: {
          merchantDisplayName: salonName || "Default Salon Name", // Ensure it never is empty
        },
      },
    });
    console.log("Session created:", session);


    // Respond with session ID
    res.status(200).json({
      success: true,
      clientSecret: session.id,
      customerId: session.customer,
      ephemeralKey: session.ephemeralKey,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error.message, error.stack);
    res.status(500).json({
      success: false,
      msg: "Error creating checkout session",
      error: error.message,
    });
  }
};

// Confirm booking after successful payment
export const confirmBooking = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const {
        salonId,
        selectedStylist,
        selectedDate,
        selectedTime,
        customerFirstName,
        customerLastName,
        customerPhoneNumber,
        customerEmail,
      } = session.metadata;

      // Check for existing booking
      const existingBooking = await Booking.findOne({
        salonId,
        selectedStylist,
        selectedDate,
        selectedTime,
        customerEmail,
      });

      if (existingBooking) {
        return res.status(200).json({
          success: true,
          msg: "Booking already exists",
          bookingId: existingBooking._id,
        });
      }

      // Create a new booking
      const newBooking = await Booking.create({
        salonId,
        selectedStylist,
        selectedDate,
        selectedTime,
        customerFirstName,
        customerLastName,
        customerPhoneNumber,
        customerEmail,
      });

      res.status(200).json({
        success: true,
        msg: "Booking created successfully",
        bookingId: newBooking._id,
      });
    } else {
      res.status(400).json({ success: false, msg: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error confirming booking:", error.message, error.stack);
    res.status(500).json({
      success: false,
      msg: "Error confirming booking",
      error: error.message,
    });
  }
};
