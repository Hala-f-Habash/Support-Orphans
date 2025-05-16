const express = require('express');
const router = express.Router();
const orphanController = require('../controllers/orphanController');
const upload = require('../middleware/uploadImage');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware'); 
const {
  sponsorOrphanValidation,
  postUpdateValidation
} = require('../validations/orphanValidation');


router.get('/', orphanController.getAllOrphans);
router.get('/:id', orphanController.getOrphanDetails);
router.post('/',authenticate, upload.single('profile_img'), orphanController.createOrphan);

router.post(
  '/:id/sponsor',authenticate,//for JWT
  sponsorOrphanValidation,
  validate,
  orphanController.sponsorOrphan
);

router.post(
  '/:id/updates',authenticate,
 postUpdateValidation,
  validate,
  orphanController.postUpdate
);

module.exports = router;
