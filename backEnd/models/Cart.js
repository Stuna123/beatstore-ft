import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: Number,
                selected: {
                    type: Boolean,
                    default: true,
                },
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.model("Cart", cartSchema)