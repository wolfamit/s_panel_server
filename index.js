import express from 'express';
import cors from 'cors';
import './db.js';
import {WebSocketServer} from 'ws';
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


const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Frontend connected via WebSocket');
    
    // Listen for messages from the frontend (if needed)
    ws.on('message', (message) => {
        console.log('Received from frontend:', message);
    });
});

// Upgrade HTTP requests to WebSocket connection
app.server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

// POST route that receives cart_id from Python script
app.post("/item", async (req, res) => {
    const { cart_id } = req.body;
    console.log('Received cart_id:', cart_id);

    // Broadcast the cart_id to all connected WebSocket clients
    wss.clients.forEach((client) => {
        
            client.send(JSON.stringify({ cart_id }));
        
    });

    // Send a response back to the Python script
    res.status(200).json({ cart_id, message: 'Cart ID sent to frontend' });
});

// client.query('SELECT * FROM items')  // Execute the query
//     .then(result => {
//         console.log(result.rows);  // Output the result of the query
//     })
//     .catch(err => {
//         console.error('Error executing query', err.stack);  // Log any query errors
//     });import express from 'express';


// Set up WebSocket server

