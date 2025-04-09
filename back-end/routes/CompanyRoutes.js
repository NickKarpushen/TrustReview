const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/CompanyController');
const UserController = require('../controllers/UserController')

router.get('/company', UserController.authMiddleware, CompanyController.getCompany)

module.exports = router;