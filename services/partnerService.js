const partnerRepo = require('../repositories/partnerRepository');

exports.getPartnerStats = async () => {
  return await partnerRepo.aggregatePartnerData();
};
