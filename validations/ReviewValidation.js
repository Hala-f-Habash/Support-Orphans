

const { body } = require('express-validator');

exports.createReviewValidation = [
    body('comment')
    .isString()
    .withMessage('Comment must be a string')
    .trim()
    .notEmpty()
    .withMessage('Comment is required')
    .isLength({ max: 200 })
    .withMessage('Comment cannot exceed 1000 characters'),

  body('orphanage_id')
    .isInt({ min: 1 })
    .withMessage('Invalid orphanage ID'),

  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5')

  
];

