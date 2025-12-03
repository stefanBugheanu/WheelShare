import express from "express";
import {
  createRental,
  getMyRentals,
  getAllRentals,
  refundRental,
} from "../controllers/rentalController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { cancelRental } from "../controllers/rentalController.js";

const router = express.Router();

router.post("/", protect, createRental);
router.get("/me", protect, getMyRentals);
router.post("/:id/refund", protect, refundRental);

router.delete("/:id", protect, cancelRental);
router.get("/", protect, adminOnly, getAllRentals);

export default router;
