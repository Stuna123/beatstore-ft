import express from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// public 
router.get("/", getProducts);
router.get("/:id", getProductById);

// admin
router.post("/", authMiddleware, adminMiddleware, createProduct)
router.put("/:id", authMiddleware, adminMiddleware, updateProduct)
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct)

export default router;