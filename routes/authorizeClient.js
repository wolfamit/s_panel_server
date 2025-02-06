import express from 'express';
import AuthorizedClient from '../mongoSchema.js';

const router = express.Router();

router.post('/authorize', async (req, res) => {
    try {
        const { value, secret } = req.body;
        
        if (!value) {
            return res.status(400).json({ message: "MAC address is missing" });
        }
        
        // Check if the secret is missing
        if (!secret) {
            return res.status(400).json({ message: "Secret value is missing" });
        }

        // Find the secret in the database
        const curr = await AuthorizedClient.findOne({ secret });

        if (!curr) {
            // Secret not found, authorization failed
            return res.status(403).json({ message: "Authorization failed: Secret not found" });
        }else if(curr.value && curr.value != value){
            return res.status(403).json({ message: "Authorization failed: MacAdd already found" });
        } else {
            // Secret found, authorization successful
            curr.value = value;
            await curr.save(); // Save the updated document
            return res.status(200).json({ message: "Authorization successful", macAdd: value });
        }
    } catch (error) {
        console.error("Error during authorization:", error);
        res.status(500).json({ message: "Internal Server Error" , error : error});
    }
});

export default router