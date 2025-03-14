import express from 'express';
import AuthorizedClient from '../mongoSchema.js';
import superAuthorizedClient from '../superClientSchema.js';

const router = express.Router();

router.get('/getKeyDetails', async (req, res) => {
    try {
        const details = await AuthorizedClient.find({});
        res.status(200).json(details);
    } catch (error) {
        console.error("Error during getting Details:", error);
        res.status(500).json({ message: "Internal Server Error" , error : error});
    }
});

router.get('/getSuperKeyDetails', async (req, res) => {
    try {
        const details = await superAuthorizedClient.find({});
        res.status(200).json(details);
    } catch (error) {
        console.error("Error during getting Details:", error);
        res.status(500).json({ message: "Internal Server Error" , error : error});
    }
});

export default router;