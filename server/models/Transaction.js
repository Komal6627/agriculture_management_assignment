import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['success', 'failed', 'pending'], 
    default: 'pending' 
  },
  transactionId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['Razorpay'] 
  },
  razorpayOrderId: { 
    type: String, 
    required: true 
  }, 
  razorpayPaymentId: { 
    type: String, 
    required: true 
  }, 
  razorpaySignature: { 
    type: String, 
    required: true 
  }, 
  paymentDetails: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: false, 
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: false, 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;
