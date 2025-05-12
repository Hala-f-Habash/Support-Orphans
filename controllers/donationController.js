const donationService = require('../services/donationService');

exports.createDonation = async (req, res) => {
  try {
    //console.log('Decoded user from token:', req.user);

    // Allow donors, sponsors, and admins to create donations
    const allowedRoles = ['donor', 'sponsor', 'admin'];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        error: 'Only donors, sponsors, or admins can create donations' 
      });
    }

    const donationData = {
      ...req.body,
      user_id: req.user.userId   // Authenticated user's ID
    };
    
    const donationId = await donationService.createDonation(donationData);
    res.status(201).json({ 
      success: true,
      donationId,
      message: 'Donation created successfully' 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    // Only admins can view all donations
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        error: 'Only admins can view all donations' 
      });
    }

    const donations = await donationService.getAllDonations();
    res.json({ success: true, data: donations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDonationDetails = async (req, res) => {
  try {
    const donation = await donationService.getDonationById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ success: false, error: 'Donation not found' });
    }

    // Allow admin, donation owner, or orphanage manager to view details
    const canView = req.user.role === 'admin' || 
                   donation.user_id === req.user.userId || 
                   req.user.role === 'orphanageManager';
    
    if (!canView) {
      return res.status(403).json({ 
        success: false,
        error: 'Not authorized to view this donation' 
      });
    }

    res.json({ success: true, data: donation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserDonations = async (req, res) => {
  try {
    // Users can only view their own donations
    const donations = await donationService.getUserDonations(req.user.userId );
    res.json({ success: true, data: donations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateDonationStatus = async (req, res) => {
  try {
    // Only admins and orphanage managers can update donation status
    const allowedRoles = ['admin', 'orphanageManager'];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        error: 'Only admins or orphanage managers can update donation status' 
      });
    }

    await donationService.updateDonationStatus(req.params.id, req.body.status);
    res.json({ success: true, message: 'Donation status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};