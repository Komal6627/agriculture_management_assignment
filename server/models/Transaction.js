import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ['success', 'failed', 'pending'], default: 'pending' },
  transactionId: { type: String, required: true, unique: true },
  paymentMethod: { type: String, required: true, enum: ['Razorpay', 'Stripe'] },
  paymentDetails: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: false, // Optionally, you can store detailed response data from the payment gateway here
  },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;
