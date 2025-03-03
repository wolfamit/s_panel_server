import express from 'express';
import AuthorizedClient from '../mongoSchema.js';
import superAuthorizedClient from '../superClientSchema.js';

const router = express.Router();

router.post('/authorize', async (req, res) => {
    try {
        const { value, secret } = req.body;
        
        if (!value) {
            return res.status(400).json({ message: "MAC address is missing" });
        }
        
        if (!secret) {
            return res.status(400).json({ message: "Secret value is missing" });
        }

        // Function to check and update authorization
        const authorizeClient = async (Model) => {
            const client = await Model.findOne({ secret });

            if (!client) return null;

            if (client.value && client.value !== value) {
                return { error: "Authorization failed: MAC address already registered with a different secret." };
            }

            client.value = value;
            await client.save();
            return client;
        };

        let client = await authorizeClient(AuthorizedClient);
        
        if (!client) {
            client = await authorizeClient(superAuthorizedClient);
            if (!client) {
                return res.status(403).json({ message: "Authorization failed: Secret not found" });
            }
        }

        return res.status(200).json({ message: "Authorization successful", macAdd: client.value });

    } catch (error) {
        console.error("Error during authorization:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;
