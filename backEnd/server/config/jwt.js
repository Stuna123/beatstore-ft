/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    //const process = NODEJS.process;
    return jwt.sign(
        { id: userId }, process.env.JWT_SECRET, { 
            expiresIn: "7d",
        });
};
