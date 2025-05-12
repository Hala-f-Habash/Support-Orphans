
const db = require('../config/db');

exports.processPayment = async (paymentData) => {
  try {
    // 1. Validate payment data
    if (!paymentData.amount || paymentData.amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    // 2. Simulate payment processing
    const paymentSuccessful = Math.random() > 0.1; // 90% success rate for testing

    // 3. Record transaction
    const [result] = await db.query(
      `INSERT INTO payment_transactions 
       (user_id, amount, status, gateway_response) 
       VALUES (?, ?, ?, ?)`,
      [
        paymentData.donorId,
        paymentData.amount,
        paymentSuccessful ? 'completed' : 'failed',
        paymentSuccessful ? 'Simulated successful payment' : 'Simulated payment failure'
      ]
    );

    if (!paymentSuccessful) {
      throw new Error('Simulated payment failure (10% chance)');
    }

    return { 
      success: true,
      transactionId: result.insertId
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};