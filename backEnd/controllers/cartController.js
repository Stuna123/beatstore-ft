//import { populate } from "dotenv";
import Cart from "../models/Cart.js";

//* Get user cart
export const getCart = async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product"
    )

    if(!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] })
    }

    res.json(cart)
};

//* Ajouter au panier
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if(!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    )

    if(itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
    } else {
        cart.items.push({ product: productId, quantity })
    }

    await cart.save();

    const populateCart = await cart.populate("items.product")
    res.json(populateCart);
}

//* Supprimer item
export const removeFromCart = async (req, res) => {

    const cart = await Cart.findOne({ user: req.user._id })

    if(!cart) {
        return res.status(404).json({ message: "Panier introuvable !" })
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== req.params.productId 
    )

    await cart.save();

    const populateCart = await cart.populate("items.product")
    res.json(populateCart);
}

//* Supprimer par sélectionne d'un unité item (ex: x3 après suppression : x2)
export const decrementItem = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });

    if(!cart) {
        return res.status(404).json({ message: "Panier introuvable !" });
    } 

    const item = cart.items.find(
        (i) => i.product.toString() === req.params.productId
    )

    if(!item) {
        return res.status(404).json({ message: "Le produit n'a pas été trouvé !" });
    }   

    if(item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.items = cart.items.filter(
            (i) => i.product.toString() !== req.params.productId
        );
    }

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
}

//* Ajout d'un produit depuis le panier
export const incrementItem = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id })

    const item = cart.items.find(
        (i) => i.product.toString() === req.params.productId
    )

    if(!item) return res.status(404).json({ message: "Le produit n'a pas été trouvé !" });

    item.quantity += 1;

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
}

//* Vider le panier
export const clearCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id });

    if(!cart) 
        return res.json({ items: [] });

    cart.items = [];
    await cart.save();

    res.json(cart);
}

export const toggleSelect = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id })

    const item = cart.items.find(
        (i) => i.product.toString() === req.params.productId
    )

    if(!item) {
        return res.status(404).json({ message: "Le produit n'a pas été trouvé !" })
    }

    item.selected = !item.selected;
    await cart.save();
    await cart.populate("items.product")

    res.json(cart);
}