import Razorpay from 'razorpay';
import crypto from 'crypto';
import Transaction from '../models/Transaction.js';


// Initialize Razorpay
console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});



// Create a new transaction
export const createTransaction = async (req, res) => {
  const { amount, currency } = req.body;
  const user = req.user; // Assuming user is set after authentication

  try {
    // Create an order in Razorpay
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay uses paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    // Create the transaction in the database
    const transaction = new Transaction({
      user: user.id,
      amount,
      status: 'created',
      transactionId: order.id,
    });

    // Save the transaction
    await transaction.save();

    res.status(200).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ 
      message: 'Transaction failed',
      error: error.message || 'Something went wrong during transaction creation.'
    });
  }
};

// Verify Razorpay payment
export const verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  console.log('Verifying payment:', req.body); // Log request body for debugging

  try {
    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Update transaction status to 'successful'
    await Transaction.updateOne(
      { transactionId: razorpay_order_id },
      { status: 'succeeded' }
    );

    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

// Get all transactions for the authenticated user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};
