import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const mongoUrl = process.env.MONOGO_DB_URL;

mongoose.connect(mongoUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds)
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

