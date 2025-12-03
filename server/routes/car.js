import express from "express";
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getAvailableCars,
  removeAttribute,
  addUniquePinsToCars,
} from "../controllers/carController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllCars);
router.get("/available/byDate", getAvailableCars);
router.get("/:id", getCarById);

router.post("/", protect, adminOnly, createCar);
router.put("/:id", protect, adminOnly, updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);
router.patch("/:id/removeAtt", protect, adminOnly, removeAttribute);
router.post("/addUniquePins", addUniquePinsToCars);

export default router;
