const orphanRepo = require('../repositories/orphanRepository');

exports.getAllOrphans = async () => orphanRepo.fetchAllOrphans();

exports.getOrphanDetails = async (id, baseUrl) => {
  const orphan = await orphanRepo.fetchOrphanById(id);
  const updates = await orphanRepo.fetchOrphanUpdates(id);
  const sponsors = await orphanRepo.fetchOrphanSponsors(id);

  if (orphan && orphan.profile_img)
    orphan.profile_img = `${baseUrl}/uploads/${orphan.profile_img}`;

  return { orphan, updates, sponsors };
};

exports.createOrphan = async (data) => {
  return await orphanRepo.createOrphan(data);
};

exports.sponsorOrphan = async (orphanId, userId, { type, amount }) => {
  return await orphanRepo.addSponsorship(userId, orphanId, type, amount);
};

exports.postUpdate = async (orphanId, update) => {
  return await orphanRepo.addUpdate(orphanId, update);
};
