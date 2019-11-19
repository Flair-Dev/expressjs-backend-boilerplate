const httpStatus  = require('http-status');
const ApiError    = require('./api.error');

module.exports = class NotAuthorized extends ApiError {
  constructor(message) {
    super(message || 'Not Authorized', httpStatus.UNAUTHORIZED);
  }
};
