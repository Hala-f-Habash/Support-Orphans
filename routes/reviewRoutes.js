const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewsController');

const {createReviewValidation} = require("../validations/ReviewValidation")
const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware');

// Review CRUD routes
router.post('/', authenticate,createReviewValidation,validate,reviewController.createReview);

router.get('/',authenticate, reviewController.getAllReviews);

router.get('/:id',authenticate, reviewController.getReviewById);

router.get('/orphanage/:orphanageId',authenticate, reviewController.getReviewsByOrphanage);

// router.put('/:id',authenticate, reviewController.updateReview);

router.delete('/:id',authenticate, reviewController.deleteReview);

module.exports = router;