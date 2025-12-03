import Rental from "../modelsDB/Rental.js";
import Car from "../modelsDB/Car.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import dayjs from "dayjs";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createRental = async (req, res) => {
  try {
    const { carId, startDate, endDate, pickupTime, dropOffTime } = req.body;

    if (!carId || !startDate || !endDate || !pickupTime || !dropOffTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not available" });
    }

    const overlapping = await Rental.findOne({
      car: carId,
      status: "active",
      $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    });

    if (overlapping) {
      return res
        .status(409)
        .json({ message: "Car is already rented during this period" });
    }

    const rentalStartTime = new Date(startDate).setHours(
      parseInt(pickupTime.split(":")[0]),
      parseInt(pickupTime.split(":")[1]),
      0,
      0
    );
    const rentalEndTime = new Date(endDate).setHours(
      parseInt(dropOffTime.split(":")[0]),
      parseInt(dropOffTime.split(":")[1]),
      0,
      0
    );

    if (
      new Date(pickupTime) < rentalStartTime ||
      new Date(dropOffTime) > rentalEndTime
    ) {
      return res
        .status(400)
        .json({ message: "Pickup/Drop-off time is outside rental period" });
    }

    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = days * car.pricePerDay;

    const rental = await Rental.create({
      user: req.user._id,
      car: carId,
      startDate,
      endDate,
      pickupTime,
      dropOffTime,
      totalPrice,
    });

    await car.save();
    console.log("🧾 Creating rental for user:", req.user._id);

    res.status(201).json(rental);
  } catch (err) {
    console.error("Create rental error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRentals = async (req, res) => {
  try {
    console.log("🔐 User logat:", req.user._id);

    const rentals = await Rental.find({ user: req.user._id })
      .populate("car", "brand model imageUrl pricePerDay")
      .sort({ createdAt: -1 });

    console.log("🔍 Rezervări găsite:", rentals.length);
    if (rentals.length > 0) {
      console.log(
        "🎯 Prima rezervare:",
        rentals[0].car ? rentals[0].car.brand : "Mașină ștearsă"
      );
    }

    const validRentals = rentals.filter((r) => r.car !== null);

    res.status(200).json(validRentals);
  } catch (err) {
    console.error("Get my rentals error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("user", "name email")
      .populate("car", "brand model location")
      .sort({ createdAt: -1 });

    res.status(200).json(rentals);
  } catch (err) {
    console.error("Get all rentals error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const refundRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).json({ message: "Rental not found" });

    if (
      req.user.role !== "admin" &&
      rental.user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to refund this rental" });
    }

    if (rental.status === "cancelled") {
      return res.status(400).json({ message: "Rental is already cancelled." });
    }

    if (rental.paymentStatus === "refunded") {
      return res.status(400).json({ message: "Rental was already refunded." });
    }

    if (rental.paymentStatus !== "paid") {
      return res.status(400).json({ message: "There's no payment to refund." });
    }

    const now = dayjs();
    const startDate = dayjs(rental.startDate);
    if (startDate.diff(now, "hour") < 24) {
      return res.status(400).json({
        message: "You can only cancel more than 24h before the rental starts.",
      });
    }

    const refund = await stripe.refunds.create({
      payment_intent: rental.paymentIntentId,
    });

    rental.paymentStatus = "refunded";
    rental.status = "cancelled";
    await rental.save();

    const car = await Car.findById(rental.car);
    if (car) {
      car.available = true;
      await car.save();
    }

    res.status(200).json({ message: "Refund successful", refund });
  } catch (err) {
    console.error("Refund error:", err.message);
    res.status(500).json({ message: "Refund failed!" });
  }
};

export const cancelRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    if (
      req.user.role !== "admin" &&
      rental.user.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this rental" });
    }
    await rental.deleteOne();

    res.status(200).json({ message: "Rental deleted successfully" });
  } catch (err) {
    console.error("Delete rental error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
