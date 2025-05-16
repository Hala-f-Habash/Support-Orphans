const requestRepo = require('../repositories/orphanageRequestRepository');

exports.createRequest = async (data) => {
  const orphanage = await requestRepo.getOrphanageByName(data.orphanage_name);
  if (!orphanage) throw new Error('Orphanage not found');

  const fullData = {
    orphanage_id: orphanage.orphanage_id,
    service_type: data.service_type,
    description: data.description,
    needed_date: data.needed_date,
    number_of_orphanages: data.number_of_orphanages
  };

  return await requestRepo.insertRequest(fullData);
};

exports.getOrphanageById = async (id) => {
  return await requestRepo.getOrphanageById(id);
};


exports.updateVerifiedStatus = async (user, orphanageId, isVerified) => {
  if (user.role !== 'admin') {
    throw new Error('Only admin users can verify orphanages');
  }

  const rowsAffected = await requestRepo.updateVerifiedStatus(orphanageId, isVerified);
  if (rowsAffected === 0) {
    throw new Error('Orphanage not found or not updated');
  }

  return { orphanageId, verified: isVerified };
};

