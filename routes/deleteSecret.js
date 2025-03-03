import express from 'express';
import  AuthorizedClient  from "../mongoSchema.js";
import superAuthorizedClient from '../superClientSchema.js';

const router = express.Router();

const deleteSecret = async (id , Model) => {
    try {
        const result = await Model.deleteOne({ _id: id });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error deleting secret from database:", error);
        throw new Error("Database deletion error");
    }
};

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const success = await deleteSecret(id , AuthorizedClient);
        if (success) {
            res.status(200).json({ message: "Secret deleted successfully" });
        } else {
            res.status(404).json({ message: "Secret not found" });
        }
    } catch (error) {
        console.error("Error deleting secret:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post('/superDelete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const success = await deleteSecret(id , superAuthorizedClient);
        if (success) {
            res.status(200).json({ message: "Secret deleted successfully" });
        } else {
            res.status(404).json({ message: "Secret not found" });
        }
    } catch (error) {
        console.error("Error deleting secret:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;