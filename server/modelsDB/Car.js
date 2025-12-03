import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, default: "Aeroportul Otopeni" },
    seats: { type: Number, default: 5 },
    transmission: {
      type: String,
      enum: ["manual", "automatic"],
      default: "automatic",
    },
    engine: {
      type: String,
      enum: ["diesel", "gas", "electric"],
      default: "diesel",
    },
    imageUrl: { type: String, required: true },
    pin: {
      type: String,
      required: true,
      unique: true,
    },
  },

  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
