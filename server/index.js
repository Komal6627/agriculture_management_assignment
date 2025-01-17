import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js'
import fieldRoutes from './routes/fieldRoutes.js'
import aiRoutes from './routes/aiRoutes.js'

import transactionRoutes from './routes/transectionRoutes.js'
import Razorpay from 'razorpay';



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});




const app = express();


// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/field', fieldRoutes);
app.use("/api/ai", aiRoutes);
app.use('/api/transactions', transactionRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL
    , { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


