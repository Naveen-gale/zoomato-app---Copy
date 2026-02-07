const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// routes for user
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)
// routes for foodpatner 
router.post('/food-partner/register', authController.registerfoodpatner)
router.post('/food-partner/login', authController.loginFoodpatner)
router.get('/food-partner/logout', authController.logoutFoodpatner)

module.exports = router;