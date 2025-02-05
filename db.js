import pg from 'pg'
import dotenv from 'dotenv'
const { Client } = pg;
dotenv.config();

const connectionString = process.env.PG_URL 


const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Required for cloud-hosted databases with SSL
    },
});

client.connect()
    .then(() => {
        console.log("Connected to PostgreSQL");
    })
    .catch(err => {
        console.error("Error connecting to PostgreSQL", err.stack);
    });

// Export the client for use in other files
export default client;