const reviewRepo = require('../repositories/ReviewRepository');
const orphanageService = require('./orphanageRequestService');


   exports.createReview = async (reviewData)=> {

    const orphanage = await orphanageService.getOrphanageById(reviewData.orphanage_id);
    if (!orphanage ) {
      throw new Error('no such orphanage with this id');
   }

      await reviewRepo.insertReview(reviewData);}

   exports.getAllReviews = async() =>
      reviewRepo.getAllReviews();
  

   exports.getReviewById = async(reviewId)=> 
      reviewRepo.getReviewById(reviewId);
  

   exports.getReviewsByOrphanage = async(orphanageId)=> 
      reviewRepo.getOrphanageReviews(orphanageId);
  

   exports.updateReview = async(reviewId, reviewData)=> 
      reviewRepo.updateReviewByID(reviewId, reviewData);
  

   exports.deleteReview = async(reviewId)=> 
      reviewRepo.deleteReviewsByID(reviewId);
  


const Filter = require('bad-words');

exports.deleteReview = async (user, reviewId) => {

  const review = await reviewRepo.getReviewById(reviewId);

  // Orphanage managers - must check ownership
  if (user.role === 'orphanageManager') {
    const orphanage = await orphanageService.getOrphanageById(review.orphanage_id);
    if (!orphanage || orphanage.manager_id !== user.userId) {
      throw new Error('You are not allowed to delete this review');
    }
    const filter = new Filter();
         if (!filter.isProfane(review.comment)) {
          throw new Error('Cannot delete review: no inappropriate content');
          }
   
    return await reviewRepo.deleteReviewsByID(reviewId);
  }

  throw new Error('You are not authorized to delete reviews');
};


