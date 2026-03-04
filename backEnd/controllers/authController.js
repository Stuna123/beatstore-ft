/* eslint-disable no-undef */
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../server/config/jwt.js";

import crypto from "crypto";
import nodemailer from "nodemailer";

// register
export const register = async (req,res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password) {
            return res.status(400).json({ message: "Vous devez remplir tous les champs" })
        }

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({ message: "Utilisateur existe déjà" })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            token: generateToken(user._id),
            user: {
                _id: user.id,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

// login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(401).json({ message: "Erreur... Le email ou le mot de passe est invalide !" })
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ message: "Erreur... Le email ou le mot de passe est invalide !" })
        }

        res.json({
            token: generateToken(user._id),
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// forgotPassword
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ message: "Si un compte existe, un email a été envoyé." })
        }

        // Générer token brut
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hasher le token pour la bdd
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;

        // 15 minutes avant expiration
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;  

        await user.save();

        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        //console.log(process.env.EMAIL_USER);
        //console.log(process.env.EMAIL_PASS);

        // Message envoyé au compte gmail
        await transporter.sendMail({
            to: user.email,
            subject: "Réinitialisation de mot de passe",
            html: `
                <h3> Réinitialisation de mot de passe </h3>
                <p> Cliquez sur le lien : </p>
                <a href="${resetURL}"> ${resetURL} </a>
            `,
        });
        res.json({ message: "Si un compte existe, un email a été envoyé." });

    } catch (error) {
        res.status(500).json({message: error.message })
    }
}

// resetPassword
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Hasher le token reçu
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({ 
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if(!user) {
            return res.status(400).json({ message: "Le token invalide ou expiré !" })
        }

        // Hash du nouveau mdp
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // L'utilisateur reçoit le mdp
        user.password = hashedPassword;

        // Nettoyage
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: "Le mot de passe a été réinitialisé avec succès !" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMe = async (req, res) => {
    res.json(req.user)
}