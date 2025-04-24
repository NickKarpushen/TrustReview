const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/CompanyController');
const UserController = require('../controllers/UserController')

router.get('/company', UserController.authMiddleware, CompanyController.getCompany);

router.get('/companies', CompanyController.getCompanies);

router.patch('/company', UserController.authMiddleware,  CompanyController.upload.single('logo'), CompanyController.updateCompany);

module.exports = router;