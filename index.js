
import express from 'express';
import cors from 'cors';
import './db.js';
// import  client  from './db.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 8800;

app.use(cors());
app.use(express.json({limit: "30mb" , extended: "true"}));

app.get("/", async (req, res) => {
    res.send("Hello World!");
});


let cart_id = null;  // Variable to store cart_id in memory

// POST route to set the cart_id
app.post("/item", async (req, res) => {
    const { cart_id } = req.body;
    console.log('Received cart_id:', cart_id);
    cart_id = cart_id;  // Save the cart_id in memory
    res.status(200).json({ cart_id });
});

// GET route to retrieve the cart_id
app.get("/cart", (req, res) => {
    if (cart_id) {
        res.status(200).json({ cart_id });
    } else {
        res.status(404).json({ message: 'Cart ID not found' });
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

