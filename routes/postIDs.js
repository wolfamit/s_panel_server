import express from 'express';
import AuthorizedClient from '../mongoSchema.js';
import superAuthorizedClient from '../superClientSchema.js';
import clientIDs from '../Models/clientsIDS.js'

const router = express.Router();

router.post('/postIDs', async (req, res) => {
    try {
        const { secret, Id } = req.body;

        if (!secret) {
            return res.status(400).json({ message: "client name is missing" });
        }
        if (!Id) {
            return res.status(400).json({ message: "id value is missing" });
        }

        // Function to check and update authorization
        const authorizeClient = async (Model) => {
            const client = await Model.findOne({ secret: secret });

            if (!client) return null;

            let clientRecord = await clientIDs.findOne({ customerID: secret });

            if (!clientRecord) {
                // Create a new record if it doesn't exist
                clientRecord = await clientIDs.create({
                    customerID: secret,
                    IDs: [Id], // Initialize array with the first ID
                });

            } else {
                // Update existing record
                if (!clientRecord.IDs.includes(Id)) {
                    clientRecord.IDs.push(Id);
                    await clientRecord.save();
                }
            }

            return clientRecord;
        };

        let client = await authorizeClient(AuthorizedClient);
        
        if (!client) {
            client = await authorizeClient(superAuthorizedClient);
            if (!client) {
                return res.status(403).json({ message: "Authorization failed: client not found" });
            }
        }

        return res.status(200).json({ message: "Successful", client });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;
