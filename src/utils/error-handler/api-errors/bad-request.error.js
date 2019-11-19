const httpStatus  = require('http-status');
const ApiError    = require('./api.error');

module.exports = class BadRequest extends ApiError {
  constructor(message) {
    super(message || 'Bad Request', httpStatus.BAD_REQUEST);
  }
};
