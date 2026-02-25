import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getWishlist, toggleWishlist } from "../controllers/wishlistController.js";

const router = express.Router()

router.get("/", authMiddleware, getWishlist);
router.post("/:id", authMiddleware, toggleWishlist);

export default router;