import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import addsecret from './routes/addSecret.js';
import authorizeClient from './routes/authorizeClient.js';
import postIDs from './routes/postIDs.js';
import getIds from './routes/getIds.js';
import getSecretDetails from './routes/getSecretDetails.js';
import deleteSecret from './routes/deleteSecret.js';
import blockSecret from './routes/blockSecret.js';
import ResetSecret from './routes/ResetSecret.js';
import authenticationAdmin from './routes/authenticationAdmin.js';
import createAdmin from './routes/addAdmin.js';
import auth from './middleware/auth.js'
import './mongoDb.js';

dotenv.config();

const app = express();
const PORT = 8800;

app.use(express.json({limit: "30mb" , extended: "true"}));
app.use(express.urlencoded({ limit: "30mb" , extended: "true"}));
app.use(helmet()); // security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //logs HTTP requests made to your server
app.use(cors()); //respond to cross-origin requests from web pages hosted on different domains


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

app.use("/api", authorizeClient);
app.use("/api",  postIDs);
app.use("/api" , getIds)
app.use('/api', auth , addsecret);
app.use('/api', auth , getSecretDetails);
app.use('/api', auth ,deleteSecret);
app.use('/api', auth , blockSecret);
app.use('/api', auth , ResetSecret);
app.use('/admin', authenticationAdmin);
app.use('/admin', auth ,createAdmin);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


