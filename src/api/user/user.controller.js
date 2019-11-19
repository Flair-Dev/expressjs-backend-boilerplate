const catchWrap = require('./../../utils/helpers/catch-express-wrap');

module.exports.getCurrentUser = catchWrap(async req => {
  const user = req.scope.resolve('currentUser');
  req.scope.resolve('ResponseService').sendSuccessResponse(user);
});
