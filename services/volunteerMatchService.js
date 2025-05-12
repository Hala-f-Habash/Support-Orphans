const matchRepo = require('../repositories/volunteerMatchRepository');
const { sendEmail } = require('../utils/sendEmail');

function getDayCategory(dateStr) {
  const day = new Date(dateStr).getDay();
  return day === 0 || day === 6 ? 'weekend' : 'weekday';//sat,sun 
}

exports.matchVolunteers = async (requestId) => {
  const request = await matchRepo.getRequestById(requestId);
  if (!request) throw new Error('Request not found');

  const availabilityTypes = getDayCategory(request.needed_date) === 'weekday'
    ? ['weekdays', 'flexible', 'on-call']
    : ['weekends', 'flexible', 'on-call'];

  const volunteers = await matchRepo.findMatchingVolunteers(request.service_type, availabilityTypes);
  const matches = [];

  for (const volunteer of volunteers) {
    await matchRepo.insertMatch(requestId, volunteer.volunteer_id);
    matches.push(volunteer);
  }


  // need to send email when match accords 
  const orphanage = await matchRepo.getOrphanageInfo(request.orphanage_id);
  if (orphanage && matches.length > 0) {
    await sendEmail({
      to: orphanage.contact_email,
      subject: 'New Volunteer Match Found',
      html: `<p>Dear ${orphanage.name},</p>
        <p>${matches.length} volunteer(s) have been matched for your request.</p>
        <p>Service: ${request.service_type}</p>
        <p>Needed on: ${request.needed_date}</p>
        <p>HopeConnect Team</p>`
    });
  }

  return matches;
};
