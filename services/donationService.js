const donationRepo = require('../repositories/donationRepository');
const paymentService = require('./paymentService');
const deliveryService = require('./deliveryService');

const db = require('../config/db');
const donationTrackRepo = require("../repositories/donationTrackingRepository");

const { getCoordinatesFromLocation } = require('../utils/axios');

exports.createDonation = async (donationData, locationStr) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    let paymentResult = { success: true, fee: 0, netAmount: donationData.amount };
    if (donationData.type === 'money') {
      paymentResult = await paymentService.processPayment({
        amount: donationData.amount,
        donorId: donationData.user_id
      });

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment processing failed');
      }
      donationData.amount = paymentResult.netAmount;
    }

    const donationId = await donationRepo.createDonation(donationData);

    if (donationData.type === 'money' && paymentResult.transactionId) {
      await connection.query(
        'UPDATE payment_transactions SET donation_id = ? WHERE transaction_id = ?',
        [donationId, paymentResult.transactionId]
      );
    }

    await donationTrackRepo.createDonationTracking({
      donation_id: donationId,
      status: donationData.type === 'money' ? 'received' : 'pending',
      update_message: 'Donation received and being processed'
    });

    let deliveryInfo = null;
    if (donationData.type !== 'money') {
      deliveryInfo = await deliveryService.assignDeliveryToDriver(
        donationId,
        locationStr // location string only
      );
    }

    await connection.commit();

    return {
      donationId,
      deliveryInfo,
      fee: paymentResult.fee,
      netAmount: donationData.amount
    };
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
  //send emails for updates 
  await donationRepo.updateDonationTrackingStatus({
    donation_id: donationId,
    status,
    update_message: "Donation status updated to ${status}"
  });
};

exports.deleteDonation = async (id) => donationRepo.deleteDonationById(id);

///need to test delete && use getDonationsByUser+getDonationsByOrphanage


exports.getAllDonationsByType = async () => {
  
  return await donationRepo.getAllDonationsByType();
};
