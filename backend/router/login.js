const express = require('express')
const router = express.Router()
const User = require('./../models/schemauser')
const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email not found" });
        }

        // Verify password
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ error: "Password does not match" });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                date: user.dateofbirth,
            },
            "your-secret-key",
            { expiresIn: "1h" }
        );

        console.log(`JWT token: ${token}`);

        // Set token in cookie
        res.cookie("token", token, { httpOnly: true, secure: true });

        // Send success response
        return res.status(200).json({ message: "Logged in successfully" });
    } catch (err) {
        console.error(`ERROR: ${err.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router