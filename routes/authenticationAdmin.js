import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Admin from '../adminSchema.js';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await Admin.findOne({ email });

        if (!existingUser) {
            // User not found, return an appropriate response
            return res.status(401).json({ message: "Admin doesn't exist" });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            // Incorrect password, return an appropriate response
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate a JWT token
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Send a successful response with user data and token
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error('Error in login:', error);

        // Send an appropriate error response
        res.status(500).json({ message: error.message });
    }
});

export default router