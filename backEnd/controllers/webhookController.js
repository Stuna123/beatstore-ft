/* eslint-disable no-undef */
/*
import Stripe from "stripe";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const webhookStripe = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const sig = req.headers["stripe-signature"]

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.error("Webhook error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // paiement confirmé
    if (event.type === "checkout.session.completed") {

        const session = event.data.object;
        const userId = session.metadata.userId;
        const paidItems = JSON.parse(session.metadata.paidItems || "[]");

        const existingOrder = await Order.findOne({
            paymentIntentId: session.payment_intent,
        });

        if (existingOrder) return res.json({ received: true });

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) return res.json({ received: true });

        // On garde uniquement les items payés
        const itemsPaid = cart.items.filter(item =>
            paidItems.includes(item.product._id.toString())
        );

        if (itemsPaid.length === 0) return res.json({ received: true });

        // Création commande seulement avec items payés
        await Order.create({
            user: userId,
            items: itemsPaid.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
            })),
            totalPrice: itemsPaid.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            ),
            status: "paid",
            paymentIntentId: session.payment_intent,
        });

        // Supprimer uniquement les produits payés du panier
        cart.items = cart.items.filter(
            item => !paidItems.includes(item.product._id.toString())
        );

        await cart.save();
    }

    res.json({ received: true })
};
*/
import Stripe from "stripe";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const webhookStripe = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;
  console.log("🔥 WEBHOOK TRIGGERED");

  try {
    event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
    );
    } catch (error) {
        console.error("Webhook error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

  if (event.type === "checkout.session.completed" && event.data.object.payment_status === "paid" ) {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const paidItemsIds = JSON.parse(session.metadata.paidItems || "[]");

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.json({ received: true });

    // 🔥 récupérer uniquement les items payés
    const paidItems = cart.items.filter(item =>
        paidItemsIds.includes(item.product.toString())
    );

    // 🔥 récupérer infos produits pour la commande
    const products = await Product.find({
        _id: { $in: paidItemsIds }
    });

    const orderItems = paidItems.map(item => {
      const product = products.find(
        p => p._id.toString() === item.product.toString()
      );

      return {
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // ✅ créer la commande seulement avec les payés
    await Order.create({
        user: userId,
        items: orderItems,
        totalPrice,
        status: "paid",
        paymentIntentId: session.payment_intent,
    });

    // ✅ supprimer uniquement les payés du panier
    cart.items = cart.items.filter(
        item => !paidItemsIds.includes(item.product.toString())
    );

    await cart.save();
  }

  res.json({ received: true });
};