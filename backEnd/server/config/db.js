/* eslint-disable no-undef */
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connecté : ${conn.connection.host}`);
    } catch (error) {
        console.error("Connection to mongoDB, failed", error.message);
        process.exit(1);
    }
}

export default connectDB;