const validate = require('express-validation');
const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { signUpUser, signInUser,  refreshToken } = require('./auth.validations');
const { isAuth } = require('../../middlewares');


router.post('/sign-up', validate(signUpUser), authController.signUp);
router.post('/sign-in', validate(signInUser), authController.signIn);
router.post('/refresh', validate(refreshToken), authController.refresh);
router.post('/logout', isAuth(), authController.logout);

module.exports = router;
