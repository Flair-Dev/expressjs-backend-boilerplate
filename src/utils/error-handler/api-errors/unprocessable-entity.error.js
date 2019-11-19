const httpStatus  = require('http-status');
const ApiError    = require('./api.error');

module.exports = class UnprocessableEntityError extends ApiError {
  constructor(message) {
    super(message || 'Unprocessable Entity', httpStatus.UNPROCESSABLE_ENTITY);
  }
};
