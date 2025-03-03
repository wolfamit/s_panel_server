import express from 'express';
import  AuthorizedClient  from "../mongoSchema.js";
import superAuthorizedClient from '../superClientSchema.js';
const router = express.Router();

router.post('/add-secret/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const secret = key;
        if (!secret) {
            return res.status(400).json({ message: "Secret value is missing" });
        }

        // Insert the secret into the authorized_client table with a null value
        const resp = await AuthorizedClient.create({ secret });
       
        res.status(201).json({ message: "Secret added successfully" , resp});
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code for MongoDB
            return res.status(409).json({ message: "Duplicate key error: Secret already exists" });
        }
        console.error("Error adding secret:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/add-supersecret/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const secret = key;
        if (!secret) {
            return res.status(400).json({ message: "Secret value is missing" });
        }

        // Insert the secret into the authorized_client table with a null value
        const resp = await superAuthorizedClient.create({ secret });
       
        res.status(201).json({ message: "Secret added successfully" , resp});
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code for MongoDB
            return res.status(409).json({ message: "Duplicate key error: Secret already exists" });
        }
        console.error("Error adding secret:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;