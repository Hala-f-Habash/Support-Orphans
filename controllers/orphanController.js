const orphanService = require('../services/orphanService');

exports.getAllOrphans = async (req, res) => {
  const orphans = await orphanService.getAllOrphans();
  res.json(orphans);
};

exports.getOrphanDetails = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const details = await orphanService.getOrphanDetails(req.params.id, baseUrl);
  res.json(details);
};

exports.createOrphan = async (req, res) => {
  try {
    // 🛡️ Only allow admins to create orphans
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can create orphans' });
    }

    const { name, age, education, health, orphanage_id } = req.body;
    const profile_img = req.file ? req.file.filename : null;

    const orphanId = await orphanService.createOrphan({
      name,
      age,
      education,
      health,
      orphanage_id,
      profile_img
    });

    res.status(201).json({ message: 'Orphan created', orphanId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.sponsorOrphan = async (req, res) => {
  try {
        const userId = req.user.userId; // ✅ must not be undefined
    const user = req.user; // comes from JWT middleware
    const orphanId = req.params.id;
    const { type, amount } = req.body;

    // (Optional) Make sure only 'sponsor' role can sponsor
    if (user.role !== 'sponsor') {
      return res.status(403).json({ error: 'Only sponsors can perform this action' });
    }

    const result = await orphanService.sponsorOrphan(orphanId, userId, { type, amount });

    res.status(201).json({
      message: 'Sponsorship successful',
      sponsorshipId: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.postUpdate = async (req, res) => {
  try {
    const user = req.user;

    //  Allow only admin users to post orphan updates
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can post updates.' });
    }

    const orphanId = req.params.id;
    const { type, description, media_url } = req.body;

    const result = await orphanService.postUpdate(orphanId, { type, description, media_url });

    res.status(201).json({ message: 'Update added', updateId: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

