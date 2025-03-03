import express from 'express';
import AuthorizedClient from "../mongoSchema.js";
import superAuthorizedClient from '../superClientSchema.js';

const router = express.Router();

router.post('/block/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const secret = await AuthorizedClient.findById(id); // Await the query
        
        if (!secret) {
            return res.status(404).json({ message: "Secret not found" });
        }

        secret.value = "blocked";
        await secret.save(); // Save the updated document

        res.status(201).json({ message: "Secret blocked successfully", secret });
    } catch (error) {
        console.error("Error blocking secret:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/superBlock/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const secret = await superAuthorizedClient.findById(id); // Await the query
        
        if (!secret) {
            return res.status(404).json({ message: "Secret not found" });
        }

        secret.value = "blocked";
        await secret.save(); // Save the updated document

        res.status(201).json({ message: "Secret blocked successfully", secret });
    } catch (error) {
        console.error("Error blocking secret:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
