const volunteerRepo = require('../repositories/volunteerRepository');

exports.registerVolunteer = async (data) => {
  return await volunteerRepo.createVolunteerProfile(data);
};
