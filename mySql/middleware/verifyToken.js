const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get JWT token from cookie
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'JWT requis' });
    }

    // Verify JWT
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'JWT invalide' });
        }

        // Store decoded JWT payload in req.user
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;