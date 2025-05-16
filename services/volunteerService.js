const volunteerRepo = require('../repositories/volunteerRepository');

exports.registerVolunteer = async (data) => {
  return await volunteerRepo.createVolunteerProfile(data);
};
exports.deleteVolunteer = async (userId) => {
  return await volunteerRepo.deleteVolunteer(userId);
};