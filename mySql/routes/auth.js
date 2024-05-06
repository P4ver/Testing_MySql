const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock user data for demonstration purposes
const users = [
    { username: 'user1', password: 'password1', role: 'Super Admin' },
    { username: 'user2', password: 'password2', role: 'Admin' },
    { username: 'user3', password: 'password3', role: 'Utilisateur' }
];



// Route for login and JWT generation
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Mock authentication logic
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // If authentication succeeds, generate JWT
    const token = jwt.sign({ username: user.username, role: user.role }, 'secret_key');

    // Set JWT as a cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }); // Expires in 24 hours

    res.json({ message: 'Connecté avec succès' });
});

module.exports = router;
