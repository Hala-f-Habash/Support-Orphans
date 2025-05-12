const donationRepo = require('../repositories/donationRepository');
const paymentService = require('./paymentService');
const db = require('../config/db');
const donationTrackRepo = require("../repositories/donationTrackingRepository")
exports.createDonation = async (donationData) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Process payment if monetary donation
    let paymentResult = { success: true };
    if (donationData.type === 'money') {
      paymentResult = await paymentService.processPayment({
        amount: donationData.amount,
        donorId: donationData.user_id
      });
      
      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment processing failed');
      }
    }

    // 2. Create donation record
    const donationId = await donationRepo.createDonation(donationData);
    
    // 3. Link payment to donation (if monetary)
    if (donationData.type === 'money' && paymentResult.transactionId) {
      await connection.query(
        'UPDATE payment_transactions SET donation_id = ? WHERE transaction_id = ?',
        [donationId, paymentResult.transactionId]
      );
    }

    // 4. Create initial tracking record
    await donationTrackRepo.createDonationTracking({
      donation_id: donationId,
      status: 'received',
      update_message: 'Donation received and being processed'
    });

    await connection.commit();
    return donationId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.getAllDonations = async () => donationRepo.getAllDonations();

exports.getDonationById = async (id) => donationRepo.getDonationById(id);

exports.getUserDonations = async (userId) => donationRepo.getDonationsByUser(userId);

exports.getOrphanageDonations = async (orphanageId) => donationRepo.getDonationsByOrphanage(orphanageId);

exports.updateDonationStatus = async (donationId, status) => {
  await donationRepo.updateDonationTrackingStatus({
    donation_id: donationId,
    status,
    update_message: `Donation status updated to ${status}`
  });
};
