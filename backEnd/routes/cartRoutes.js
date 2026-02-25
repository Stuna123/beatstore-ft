import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { getCart, addToCart, removeFromCart, decrementItem, incrementItem, clearCart, toggleSelect } from "../controllers/cartController.js";

const router = express.Router();
/*
router.get("/", authMiddleware, (req, res) => {
    res.json({
        message: "Panier utilisateur",
        user: req.user,
    })
})
*/

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);


router.patch("/decrement/:productId", authMiddleware, decrementItem);
router.patch("/increment/:productId", authMiddleware, incrementItem);
router.patch("/toggle/:productId", authMiddleware, toggleSelect);

router.delete("/clear", authMiddleware, clearCart);
router.delete("/:productId", authMiddleware, removeFromCart);

export default router;