const httpStatus  = require('http-status');
const ApiError    = require('./api.error');

module.exports = class NotFound extends ApiError {
  constructor(message) {
    super(message || 'Not Found', httpStatus.NOT_FOUND);
  }
};
