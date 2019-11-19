const httpStatus  = require('http-status');
const { getErrorHandler, handlersErrorCollections } = require('./error-handlers-collections');

// TODO add response service and logger
module.exports = (err, req, res, next) => {
  const errorClass = Array.from(handlersErrorCollections.keys()).find(eClass => err instanceof eClass);
  const [message, statusCode] = getErrorHandler(errorClass)(err);
  const errorResponse = {
    message,
    success: false,
    statusCode,
  };

  if (errorResponse.statusCode >= httpStatus.BAD_REQUEST && errorResponse.statusCode < httpStatus.INTERNAL_SERVER_ERROR) {
    console.warn(err.message);
  } else {
    // if development mode, send all error message
    if (process.env.NODE_ENV === 'development') errorResponse.stackTrace = err.stack;

    console.error(err);
  }
  req.scope.resolve('ResponseService').sendErrorResponse(errorResponse);
  next();
};
