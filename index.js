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


app.post("/item", async (req, res) => {
    const {cart_id} = await req.body;
    res.status(200).json({cart_id});
    console.log(cart_id);
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
//     });
