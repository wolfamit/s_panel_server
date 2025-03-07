import express from 'express';
import clientIDs from '../Models/clientsIDS.js';
const router = express.Router();

router.post('/getIDs', async (req, res) => {
    try {
        const { secret } = req.body;

        if (!secret) {
            return res.status(400).json({ message: "client is missing" });
        }

        // Find the client document
        const client = await clientIDs.findOne({ customerID: secret });

        if (!client || client.IDs.length === 0) {
            return res.status(404).json({ message: "No IDs found for this client" });
        }

        // Store the IDs before deleting
        const ids = client.IDs;

        // Clear the IDs array (or delete the document if necessary)
        await clientIDs.updateOne({ customerID: secret }, { $set: { IDs: [] } });

        return res.status(200).json({ message: "Successful", IDs: ids , client : secret});

    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;

