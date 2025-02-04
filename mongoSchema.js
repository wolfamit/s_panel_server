import mongoose from 'mongoose';

const authorizedClientSchema = new mongoose.Schema({
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

const AuthorizedClient = mongoose.model('AuthorizedClient', authorizedClientSchema);

export default AuthorizedClient;