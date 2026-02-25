/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "Non autorisé" })
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.id).select("-password");
        // console.log("mon user: ", req.user)
        next();

    } catch (error) {
        res.status(401).json({ message: "Token invalide !" });
        console.error("Message d'erreur: ", error.message)
    }
}

export default authMiddleware;

export const protect = async (req, res, next) => {
    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer") ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            return res.status(401).json({ message: "Non autorisé, token invalide !", error });
        }

        if (!token) {
            return res.status(401).json({ message: "Non autorisé, pas de token !" })
        }
    }
}