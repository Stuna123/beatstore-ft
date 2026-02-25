import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { createOrder, getMyOrders, getAllOrders } from "../controllers/orderController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// créer une commande depuis le panier
router.post("/", authMiddleware, createOrder);

// toutes les commande que seul l'admin peut voir
router.get("/", authMiddleware, adminMiddleware, getAllOrders);

// commandes de l'utilisateur
router.get("/my", authMiddleware, getMyOrders);

export default router;