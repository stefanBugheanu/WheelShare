import express from "express";
import { createCheckout } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", protect, createCheckout);

export default router;
