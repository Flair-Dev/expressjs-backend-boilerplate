const httpStatus  = require('http-status');
const ApiError    = require('./api.error');

module.exports = class AlreadyExist extends ApiError {
  constructor(message) {
    super(message || 'Already Exist', httpStatus.CONFLICT);
  }
};
