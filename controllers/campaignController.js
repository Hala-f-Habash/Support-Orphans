const campaignService = require('../services/campaignService');
const { validateLocation } = require('../utils/validateLocation');

exports.createCampaign = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can create emergency campaigns!!!!' });
    }

    const { title, description, location } = req.body;


    //validation location entered 
    let formattedLocation = null;
    let lat = null;
    let lon = null;
    let map_url = null;

    if (location) {
      const validated = await validateLocation(location);
      if (!validated) {
        return res.status(400).json({ error: 'Invalid location. Please try correct one' });
      }

      formattedLocation = validated.formatted_address;
      lat = validated.lat;
      lon = validated.lon;
      map_url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}`;
    }

    const campaignId = await campaignService.createCampaign({
      title,
      description,
      start_date: new Date(),
      status: true,
      location: formattedLocation
    });

    await campaignService.notifyDonors_Sponsors(title, description, formattedLocation);

    res.status(201).json({
      message: 'Campaign created succesfully!!!',
      campaign: {
        id: campaignId,
        title,
        description,
        location: formattedLocation,
        lat,
        lon,
        map_url
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}


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



