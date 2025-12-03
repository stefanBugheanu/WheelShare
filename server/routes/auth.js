import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteAllUsers,
} from "../controllers/authController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    user: req.user,
  });
});
router.get("/allUsers", protect, adminOnly, getAllUsers);
router.delete("/delete", protect, adminOnly, deleteAllUsers);

export default router;
