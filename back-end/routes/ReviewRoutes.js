const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const UserController = require('../controllers/UserController')

router.post('/review', UserController.authMiddleware, ReviewController.upload.single('image'), ReviewController.createReview);

router.delete('/review', UserController.authMiddleware, ReviewController.deleteReview);

router.get('/user_reviews', UserController.authMiddleware, ReviewController.getUserReviews);

router.get('/reviews', ReviewController.getReviews);

router.patch('/review', UserController.authMiddleware, ReviewController.upload.single('image'), ReviewController.updateReview)

module.exports = router;