import mongoose from 'mongoose';

const superAuthorizedClientSchema = new mongoose.Schema({
    secret: {
        type: String,
        unique: true,
    },
    value: {
        type: String,
        default: null,
    },
    Timestamp: {
        type: Date,
        default: Date.now,
        expires: '30d' // Set the document to expire after 30 days
    },
});

const superAuthorizedClient = mongoose.model('superAuthorizedClient', superAuthorizedClientSchema);

export default superAuthorizedClient;