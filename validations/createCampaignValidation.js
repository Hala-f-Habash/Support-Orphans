const { body } = require('express-validator');
exports.createCampaignValidation= [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('location').optional().isString().withMessage('Location must be a string') 
];