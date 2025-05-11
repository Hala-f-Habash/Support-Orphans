const express = require('express');
const router = express.Router();
const orphanController = require('../controllers/orphanController');
const upload = require('../middleware/uploadImage');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware'); 



router.get('/', orphanController.getAllOrphans);
router.get('/:id', orphanController.getOrphanDetails);
router.post('/',authenticate, upload.single('profile_img'), orphanController.createOrphan);

router.post(
  '/:id/sponsor',authenticate,//for JWT
  [
    body('type').isIn(['monthly', 'one-time']),
    body('amount').isFloat({ min: 1 })
  ],
  validate,
  orphanController.sponsorOrphan
);

router.post(
  '/:id/updates',authenticate,
  [
    body('type').isIn(['medical', 'education', 'general']),
    body('description').notEmpty()
  ],
  validate,
  orphanController.postUpdate
);

module.exports = router;
