/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import connectDB from "./server/config/db.js";
import connectDB from "./server/config/db.js"

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import { webhookStripe } from "./controllers/webhookController.js";

dotenv.config();
connectDB()

const app = express();

// middlewares globaux
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.post(
    "/api/payments/webhook", 
    express.raw({ type: "application/json" }), 
    webhookStripe
)

app.use(express.json());


// route test
app.get("/", (req, res) => {
    res.json({ message: "BeatStore API is running ! "});
})

// routes 
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/images", express.static("images"));

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur http://localhost:${PORT}`)
    
console.log("PORT:", process.env.PORT)
console.log("DB: ", process.env.MONGO_URI ? "OK" : "MISSING")
console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY ? "OK" : "MISSING")
console.log("STRIPE KEY=", process.env.STRIPE_SECRET_KEY)
console.log("STRIPE KEY=",process.env.STRIPE_WEBHOOK_SECRET)
})