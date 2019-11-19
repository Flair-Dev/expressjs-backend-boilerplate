const httpStatus  = require('http-status');
const ApiError    = require('./api.error');

module.exports = class Forbidden extends ApiError {
  constructor(message) {
    super(message || 'Forbidden', httpStatus.FORBIDDEN);
  }
};
