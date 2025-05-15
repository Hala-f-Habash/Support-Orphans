const reviewService = require('../services/ReviewService');
const reviewRepo = require('../repositories/ReviewRepository');

exports.createReview = async (req, res) => {
  try {
        //console.log('Decoded user from token:', req.user);
   // anyone can leave a review on the orphanage except orphange's manager
   const orphanageManagerRole ='orphanageManager';

       if (req.user.role === orphanageManagerRole) {
      return res.status(403).json({ 
        success: false,
        error: 'you are an orphanage\'s manager you can not make reviews' 
      });
    }

 
const reviewData = {
  user_id: req.user.userId, 
  orphanage_id: req.body.orphanage_id,
  rating: req.body.rating,
  comment: req.body.comment
};


    const reviewId = await reviewService.createReview(reviewData);


    res.status(201).json({ id: reviewId,data: reviewData,UserName: req.user.name, message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    //reviews for everyone , everyone can see it as long as loggen in
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByOrphanage = async (req, res) => {
    //reviews for everyone , everyone can see it as long as loggen in
  try {
    const reviews = await reviewService.getReviewsByOrphanage(req.params.orphanageId);
    if (!reviews) {
      return res.status(404).json({ success: false, error: 'either no Reviews or no such orphanage id' });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateReview = async (req, res) => {

//   try {

// const reviewData = {
//   user_id: req.user.userId, 
//   orphanage_id: req.body.orphanage_id,
//   rating: req.body.rating,
//   comment: req.body.comment
// };

// const reviewId = await reviewService.createReview(reviewData);

//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ 
//         success: false,
//         error: 'Only admins can update Reviews' 
//       });
//     }

//     await reviewService.updateReview(req.params.id, req.body);
//     res.json({ message: 'Review updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



exports.deleteReview = async (req, res) => {
  try {
    //role ? 
     const review = await reviewRepo.getReviewById(req.params.id);
      if (!review) throw new Error('Review not found');
    
      // Admins can delete any review
      if (req.user.role === 'admin') {
        return await reviewRepo.deleteReviewsByID(req.params.id);
      }
    
    await reviewService.deleteReview(req.user, req.params.id);
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(403).json({ success: false, error: error.message });
  }
};
