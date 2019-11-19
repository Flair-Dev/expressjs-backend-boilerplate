const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { isAuth } = require('../../middlewares');

router.get('/me', isAuth(), userController.getCurrentUser);

module.exports = router;
