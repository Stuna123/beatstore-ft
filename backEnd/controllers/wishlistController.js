import Wishlist from "../models/Wishlist.js";

export const toggleWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if(!wishlist) {
            wishlist = await Wishlist.create({ 
                user: req.user._id, 
                products: [] 
            })
        }

        const productId = req.params.id;

        const exists = wishlist.products.some(
            p => p.toString() === productId
        );

        if (exists) {
            wishlist.products.pull(productId);
        } else {
            wishlist.products.push(productId);
        }

        wishlist.products = [...new Set(wishlist.products.map(String))];
        await wishlist.save();
        
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist
            .findOne({ user: req.user._id })
            .populate("products");

        res.json(wishlist || { products: [] })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};
