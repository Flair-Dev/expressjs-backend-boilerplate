const httpStatus  = require('http-status');

// eslint-disable-next-line no-unused-vars
module.exports = makeResponseService = ({ response }) => ({

  sendSuccessResponse(data, statusCode = httpStatus.OK) {
    if (typeof data === 'string') {
      return response.status(statusCode).send({
        status: statusCode,
        success: true,
        message: data,
      });
    }
    return response.status(statusCode).send(data.toJSON ? data.toJSON() : data);
  },

  sendErrorResponse(err, details) {
    if (details) err.details = details;
    response.status(err.statusCode).send(err);
  },
});
