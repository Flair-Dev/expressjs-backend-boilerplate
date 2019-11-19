const ApiError = require('./api.error');
const AlreadyExistError = require('./already-exist.error');
const BadRequestError = require('./bad-request.error');
const ForbiddenError = require('./forbidden.error');
const NotAuthorizedError = require('./not-authorized.error');
const NotFoundError = require('./not-found.error');
const UnprocessableEntityError = require('./unprocessable-entity.error');

module.exports = {
  ApiError,
  AlreadyExistError,
  BadRequestError,
  ForbiddenError,
  NotAuthorizedError,
  NotFoundError,
  UnprocessableEntityError,
};
