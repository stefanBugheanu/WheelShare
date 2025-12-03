import express from "express";
import { stripeWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// ⚠️ Use raw body for Stripe to verify signature
router.post(
  "/payments",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
// router.post(
//   "/stripe",
//   express.json(), // ✅ înlocuiește express.raw() temporar pentru testare
//   stripeWebhook
// );

export default router;
