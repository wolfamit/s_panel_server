import express from 'express';
import cors from 'cors';
// import client from './db.js';
// import  client  from './db.js';
import dotenv from 'dotenv';
import './mongoDb.js';
import AuthorizedClient from './mongoSchema.js';

dotenv.config();

const app = express();
const PORT = 8800;

app.use(cors());
app.use(express.json());  // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data

app.get("/", async (req, res) => {
    res.send("Hello World!");
});

let cartId = null;

// endpoint for my hardware to send the item data
app.post("/item", async (req, res) => {
    const {cart_id} = await req.body;
    // 1.) Here the Items Database has to rectify the item
    // 2.) and send store the cart id , item details and timestamp in another table
    cartId = cart_id;
    res.status(200).json({cart_id , message : "Recieved in the server"});
});

// endpoint for my frontend to fetch in real time
app.get("/cart", (req, res) => {
    if (cartId) {
        res.status(200).json({ cart_id: cartId }); 
        // also the timestamp and cart id from another table
    } else {
        res.status(404).json({ message: 'Cart ID not found' });
    }
});


app.post("/authorize", async (req, res) => {
    try {
        const { value, secret } = req.body;


        if (!value) {
            return res.status(400).json({ message: "MAC address is missing" });
        }
        
        // Check if the secret is missing
        if (!secret) {
            return res.status(400).json({ message: "Secret value is missing" });
        }

        // Find the secret in the database
        const curr = await AuthorizedClient.findOne({ secret });

        if (!curr) {
            // Secret not found, authorization failed
            return res.status(403).json({ message: "Authorization failed: Secret not found" });
        }else if(curr.value && curr.value != value){
            return res.status(403).json({ message: "Authorization failed: MacAdd already found" });
        } else {
            // Secret found, authorization successful
            curr.value = value;
            await curr.save(); // Save the updated document
            return res.status(200).json({ message: "Authorization successful", macAdd: value });
        }
    } catch (error) {
        console.error("Error during authorization:", error);
        res.status(500).json({ message: "Internal Server Error" , error : error});
    }
});

app.post("/add-secret", async (req, res) => {
    try {
        const { secret } = req.body;

        if (!secret) {
            return res.status(400).json({ message: "Secret value is missing" });
        }

        // Insert the secret into the authorized_client table with a null value
        const resp = await AuthorizedClient.create({ secret });
        res.status(201).json({ message: "Secret added successfully" , resp});
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code for MongoDB
            return res.status(409).json({ message: "Duplicate key error: Secret already exists" });
        }
        console.error("Error adding secret:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// client.query('SELECT * FROM items')  // Execute the query
//     .then(result => {
//         console.log(result.rows);  // Output the result of the query
//     })
//     .catch(err => {
//         console.error('Error executing query', err.stack);  // Log any query errors
//     });import express from 'express';


// Set up WebSocket server

