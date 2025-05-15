const db = require('../config/db');


  exports.insertReview =  async (reviewData) => {
    const [result] = await db.query(
      "INSERT INTO reviews (user_id, orphanage_id, rating, comment) VALUES (?, ?, ?, ?)",
      [
        reviewData.user_id,
        reviewData.orphanage_id,
        reviewData.rating,
        reviewData.comment
      ]
    );
    return result.insertId;
  }

  exports.getAllReviews =  async ()=> {
    const [rows] = await db.query('SELECT * FROM reviews');
    return rows;
  }

   exports.getReviewById = async (reviewId) => {
    const [rows] = await db.query('SELECT * FROM reviews WHERE review_id = ?', [reviewId]);
    return rows[0];
  }

   exports.getOrphanageReviews = async (orphanageId) => {
    const [rows] = await db.query('SELECT * FROM reviews WHERE orphanage_id = ?', [orphanageId]);
    return rows;
  }

   exports.updateReviewByID = async (reviewId, reviewData) =>{
    await db.query(
      'UPDATE reviews SET user_id = ?, orphanage_id = ?, rating = ?, comment = ?  WHERE review_id = ?',
      [
        reviewData.user_id,
        reviewData.orphanage_id,
        reviewData.rating,
        reviewData.comment,
        reviewId
      ]
    );
  }

  exports.deleteReviewsByID = async (reviewId) =>{
    await db.query('DELETE FROM reviews WHERE review_id = ?', [reviewId]);
  }

