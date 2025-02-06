import express from 'express';
import Admin from '../adminSchema.js'; // Assuming you have an Admin model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

// Route to add a new admin
router.post('/addAdmin', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const resp = await Admin.findOne({email})
        if(resp){
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new admin instance
        const newAdmin = new Admin({
            name,
            email,
            password : hashedPassword,
        });
        
        // Save the admin to the database
        await newAdmin.save();
        const token = jwt.sign(
            { email: newAdmin.email, id: newAdmin._id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
          );
          // Send a successful response with user data and token
          res.status(200).json({ admin: newAdmin, token });

    } catch (error) {
        res.status(500).json({ message: 'Error adding admin', error });
    }
});

export default router;
