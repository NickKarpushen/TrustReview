const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.createUser);

router.post('/authentication', UserController.authenticationUser);

router.get('/users', UserController.authMiddleware, UserController.profileUser);

module.exports = router;

