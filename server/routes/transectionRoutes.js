import express from 'express';
import { createTransaction, verifyPayment, getTransactions } from '../controllers/transectionController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createTransaction);
router.post('/verify', authMiddleware, verifyPayment);
router.get('/', authMiddleware, getTransactions);

export default router;
