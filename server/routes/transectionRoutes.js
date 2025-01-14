import express from 'express';
console.log(2, process.env.RAZORPAY_KEY_ID)

import { createTransaction, verifyPayment, getTransactions } from '../controllers/transectionController.js';
console.log(4)
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createTransaction);
router.post('/verify', authMiddleware, verifyPayment);
router.get('/', authMiddleware, getTransactions);

export default router;
