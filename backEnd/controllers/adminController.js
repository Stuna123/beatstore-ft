import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { Parser } from "json2csv";

// stats
export const getAdminStats = async (req, res) => {
    const orders = await Order.find();

    const paid = orders.filter(o=>o.status==="paid");
    const revenue = paid.reduce((s,o)=>s+o.totalPrice,0);

    res.json({
        totalOrders: orders.length,
        paidOrders: paid.length,
        revenue
    });
};

// users
export const getUsers = async (req, res) => {
    const users = await User.find().select("email role createdAt");
    res.json(users);
};

// export produits
export const exportProducts = async (req, res) =>{ 
    const products = await Product.find();
    const parser = new Parser();
    const csv = parser.parse(products);

    res.header("Content-Type","text/csv");
    res.attachment("products.csv");
    res.send(csv);
};