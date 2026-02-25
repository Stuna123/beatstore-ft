/* eslint-disable no-undef */
import Stripe from "stripe";
// import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//* @desc Create Stripe checkout session
//* @route POST /api/payments/create-session
//* @access Private

export const createCheckoutSession = async (req, res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        // const { orderId } = req.body;
        // const order = await Order.findById(orderId).populate("items.product")
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product")
        const selectedItems = cart.items.filter(item => item.selected)
        const itemsToPay = selectedItems.length > 0 ? selectedItems : cart.items;

        if(!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Votre panier est vide !" })
        }

        const line_items = itemsToPay.map((item) => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.product.name,
                },
                unit_amount: Math.round(item.product.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cart",
            metadata: {
                userId: req.user.id,
                paidItems: JSON.stringify(
                    itemsToPay.map(item => item.product._id.toString())
                )
            }
        });

        res.json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur Stripe" })
    }
}