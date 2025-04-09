const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.createUser);

router.post('/business', UserController.createBusiness);

router.post('/authentication', UserController.authenticationUser);

router.get('/users', UserController.authMiddleware, UserController.profileUser);

router.patch('/users', UserController.authMiddleware, UserController.upload.single('avatar'), UserController.updateUser);

module.exports = router;

