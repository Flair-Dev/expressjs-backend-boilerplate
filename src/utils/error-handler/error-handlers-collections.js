const { ValidationError } = require('express-validation');
const httpStatus  = require('http-status');
const mongoose = require('mongoose');
const mongooseValidationError = mongoose.Error.ValidationError;
const { ApiError } = require('./api-errors');

const handlersErrorCollections = new Map();

const setErrorHandler = (errorClass, handler) => handlersErrorCollections.set(errorClass, handler);

setErrorHandler(ValidationError, (error) => {
  const message = error.errors.map(e => e.messages.join('. ')).join(' and ');
  const statusCode = httpStatus.BAD_REQUEST;
  return [message, statusCode];
});

setErrorHandler(mongooseValidationError, (error) => {
  const validateError = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in error.errors) {
    // eslint-disable-next-line no-prototype-builtins
    if (error.errors.hasOwnProperty(key)) {

      if (error.errors[key].kind === 'unique') {
        error.status = httpStatus.CONFLICT;
      }
      validateError.push(error.errors[key].message);
    }
  }
  const message = validateError.join('. ');
  const statusCode =  error.status || httpStatus.BAD_REQUEST;
  return [message, statusCode];
});

setErrorHandler(SyntaxError, () => {
  const message = 'Invalid JSON';
  const statusCode = httpStatus.BAD_REQUEST;
  return [message, statusCode];
});

setErrorHandler(ApiError, (error) => {
  const { message } = error;
  const statusCode = error.status;
  return [message, statusCode];
});

const defaultHandler = () => ['Internal server error!', httpStatus.INTERNAL_SERVER_ERROR];

const getErrorHandler = (key) => handlersErrorCollections.get(key) || defaultHandler;

module.exports = {
  getErrorHandler,
  handlersErrorCollections,
};
