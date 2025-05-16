
const db = require('../config/db');

exports.processPayment = async (paymentData) => {
  try {
    // 1. Validate payment data
    if (!paymentData.amount || paymentData.amount <= 0) {
      throw new Error('Invalid payment amount');
    }
const fee = parseFloat((paymentData.amount * 0.02).toFixed(2));
const netAmount = parseFloat((paymentData.amount - fee).toFixed(2));

    const paymentSuccessful = Math.random() > 0.1; // 90% success rate for testing

const [result] = await db.query(
  `INSERT INTO payment_transactions 
   (user_id, amount, fee, status, gateway_response) 
   VALUES (?, ?, ?, ?, ?)`,
  [
    paymentData.donorId,
    paymentData.amount,
    fee,
    paymentSuccessful ? 'completed' : 'failed',
    paymentSuccessful ? 'Simulated successful payment' : 'Simulated payment failure'
  ]
);


    if (!paymentSuccessful) {
      throw new Error('Simulated payment failure (10% chance)');
    }

  return { 
  success: true,
  transactionId: result.insertId,
  fee,
  netAmount
};

  } catch (error) {
    console.error('Payment processing error:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};