import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js'
import fieldRoutes from './routes/fieldRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
 import transactionRoutes from './routes/transectionRoutes.js'


dotenv.config();

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET_KEY) {
//   console.error('Razorpay keys are missing in environment variables!');
//   process.exit(1); // Exit the application if keys are not found
// }

console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_SECRET_KEY:', process.env.RAZORPAY_SECRET_KEY);

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/field', fieldRoutes);
app.use("/api/ai", aiRoutes);
app.use('/api/transactions', transactionRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Start Server
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
