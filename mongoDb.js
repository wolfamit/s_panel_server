import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const mongoUrl = process.env.MONOGO_DB_URL;

mongoose.connect(mongoUrl)

.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

