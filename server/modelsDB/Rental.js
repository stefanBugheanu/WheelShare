import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    startDate: { type: Date, requiered: true },
    endDate: { type: Date, requiered: true },
    pickupTime: { type: String, required: true },
    dropOffTime: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "cancelled", "completed"],
      default: "active",
    },
    paymentIntentId: { type: String },    paymentStatus: { type: String, default: "unpaid" },
  },
  { timestamps: true }
);

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;
