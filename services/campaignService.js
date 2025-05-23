const campaignRepo = require('../repositories/campaignRepository');
const { sendEmail } = require('../utils/sendEmail');

exports.createCampaign = async (data) => {


  return await campaignRepo.insertCampaign(data);
};

exports.notifyDonors_Sponsors = async (title, description, location) => {
  const donors = await campaignRepo.getDonorEmails();

  for (const donor of donors) {
    const locationURL = location
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
      : 'https://hopeconnect.org/campaigns';

    await sendEmail({
      to: donor.email,
      subject: ` Emergency Campaign: ${title}`,
      html: `
        <p>Dear ${donor.name},</p>
        <p>We need your urgent support for: <strong>${title}</strong>.</p>
        <p>${description}</p>
        ${location ? `<p> Location: <a href="${locationURL}">${location}</a></p>` : ''}
        <p>- HopeConnect Emergency Team</p>
      `
    });
  }
};

exports.getActiveCampaigns = async () => {
  return await campaignRepo.getActiveCampaigns();
};

exports.donateToCampaign = async ({ campaign_id, user_id, amount }) => {
  return await campaignRepo.insertCampaignDonation({ campaign_id, user_id, amount });
};



