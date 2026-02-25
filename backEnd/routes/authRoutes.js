import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController.js';
import { register, login } from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import { getMe } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

router.get("/me", protect, getMe);

export default router;          