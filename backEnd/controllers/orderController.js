import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// @desc    Create order from cart
// @route   POST /api/orders
// @access  Private

export const createOrder = async (req, res) => {
    try {
        //* Récupérer le panier de l'utilisateur
        const cart = await Cart.findOne({ user: req.user._id }).populate(
            "items.product"
        );

        if(!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Panier vide" })
        }

        //* Construire les items pour la commande
        const orderItems = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        }));

        //* Calcul du total
        const totalPrice = orderItems.reduce(
            (total, item) => total + item.price * item.quantity, 0
        )

        //* Créer la commande
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalPrice,
            status: "paid", // important pour la parti dashboard
        })

        //* Vider le panier
        cart.items = [];
        await cart.save();

        res.status(201).json(order);

    } catch (error) {
        res.status(201).json({ message: error.message })
    }
}

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "email role")
            .sort({ createdAt: -1 })

        const paidOrders = orders.filter( o => o.status === "paid")
        const totalRevenue = paidOrders.reduce(
            (sum, order) => sum + order.totalPrice, 0
        )

        res.json({
            totalOrders: orders.length,
            paidOrdersCount: paidOrders.length,
            paidOrders,
            orders,
            totalRevenue
        })
    } catch (error) {
        res.status(500).json({ message: `Erreur du serveur ${error.message}` })
    }
}

// commande utilisateur
// @desc    Get user orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.product")
            .sort({ createdAt: -1 })

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
