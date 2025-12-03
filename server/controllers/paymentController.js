import Stripe from "stripe";
import dotenv from "dotenv";
import Car from "../modelsDB/Car.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckout = async (req, res) => {
  try {
    console.log("Body primit:", req.body);
    const { carId, startDate, endDate, pickupTime, dropOffTime } = req.body;

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      console.error("Mașina nu a fost găsită cu ID-ul:", carId);
      return res.status(404).json({ message: "Car not found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
      return res
        .status(400)
        .json({ message: "Rental duration must be at least 1 day" });
    }

    const totalPrice = days * car.pricePerDay;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: `${car.brand} ${car.model}`,
              description: `This car was rented for ${days} day(s)`,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/rentals`,
      cancel_url: `${process.env.STRIPE_BASE_URL}/cancelled`,
      metadata: {
        carId: car._id.toString(),
        userId: req.user._id.toString(),
        startDate,
        endDate,
        pickupTime,
        dropOffTime,
      },
    });
    console.log("Success URL:", process.env.FRONTEND_URL);
    console.log("Cancel URL:", process.env.STRIPE_BASE_URL);
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Payment error:", err.message);
    res.status(500).json({ message: "Stripe payment failed" });
  }
};
