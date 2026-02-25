import express from "express"
import { createCheckoutSession } from "../controllers/paymentController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create-session", authMiddleware, createCheckoutSession);

export default router;

/**
 * 
import express from "express"
import { createCheckoutSession } from "../controllers/paymentController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create-session", authMiddleware, createCheckoutSession);
export default router;
*/