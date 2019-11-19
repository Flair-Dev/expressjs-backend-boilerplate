const jwt = require('jsonwebtoken');
const config = require('../../src/config/env');

module.exports = (data, options = {}) => jwt.sign(data, config.env.SECRET_KEY, options);
