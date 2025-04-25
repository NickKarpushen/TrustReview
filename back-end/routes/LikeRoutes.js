const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/LikeController');
const UserController = require('../controllers/UserController')

router.post('/like', UserController.authMiddleware, LikeController.createLike);

router.delete('/like', UserController.authMiddleware, LikeController.deleteLike);

module.exports = router;