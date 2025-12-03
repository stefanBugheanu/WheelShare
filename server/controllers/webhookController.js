import Stripe from "stripe";
import dotenv from "dotenv";
import Rental from "../modelsDB/Rental.js";
import Car from "../modelsDB/Car.js";
import User from "../modelsDB/User.js";
import mongoose from "mongoose";
import { sendConfirmationEmail } from "../mailSender/sendMail.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  console.log("Webhook endpoint hit");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(" Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Session metadata:", session.metadata);

    const { userId, carId, startDate, endDate, pickupTime, dropOffTime } =
      session.metadata;

    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const car = await Car.findById(carId);
      const days = Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = days * car.pricePerDay;

      await Rental.create({
        user: userObjectId,
        car: carId,
        startDate,
        endDate,
        pickupTime,
        dropOffTime,
        totalPrice,
        status: "active",
        paymentStatus: "paid",
        paymentIntentId: session.payment_intent,
      });

      const user = await User.findById(userObjectId);

      await sendConfirmationEmail({
        to: user.email,
        subject: "Rental Confirmation",
        html: `Hi ${user.name}, your rental of the ${car.brand} ${car.model} was successfully booked for ${totalPrice} RON. Here is your PIN access code: ${car.pin}. Enjoy your ride!`,
      });

      console.log(" Rental created via Stripe webhook");
    } catch (err) {
      console.error("Rental creation failed:", err.message);
    }
  }

  res.status(200).json({ received: true });
};
