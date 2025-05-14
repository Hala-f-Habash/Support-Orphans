const campaignService = require('../services/campaignService');

exports.createCampaign = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can create emergency campaigns' });
    }

const { title, description, location } = req.body;

    const campaignId = await campaignService.createCampaign({
      title,
      description,
      start_date: new Date(),
      status: true,
      location
    });

    await campaignService.notifyDonors(title, description,location);

const mapUrl = location
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
  : null;

res.status(201).json({
  message: 'Campaign created',
  campaign: {
    id: campaignId,
    title,
    description,
    location,
    map_url: mapUrl
  }
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getActiveCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignService.getActiveCampaigns();

    const enhancedCampaigns = campaigns.map((c) => ({
      ...c,
      map_url: c.location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.location)}`
        : null
    }));

    res.status(200).json(enhancedCampaigns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};


exports.donateToCampaign = async (req, res) => {
  try {
    const campaign_id = req.params.id;
    const user_id = req.user.userId; // JWT
    const { amount } = req.body;

    const donationId = await campaignService.donateToCampaign({ campaign_id, user_id, amount });

    res.status(201).json({
      message: 'Thank you for your donation!',
      donationId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Donation failed' });
  }
};

