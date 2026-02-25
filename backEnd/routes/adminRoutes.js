import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import { getAdminStats, getUsers, exportProducts } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Bienvenue dans la page Administrateur" })
})

router.get("/stats",authMiddleware, adminMiddleware, getAdminStats);
router.get("/users",authMiddleware, adminMiddleware,getUsers);
router.get("/export-products",authMiddleware, adminMiddleware, exportProducts);

export default router;