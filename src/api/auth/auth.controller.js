const catchWrap = require('./../../utils/helpers/catch-express-wrap');

module.exports.signUp = catchWrap(async req => {
  const userDTO  = req.body;
  const [user, tokens] = await req.scope.resolve('AuthService').signUp(userDTO);
  req.scope.resolve('ResponseService').sendSuccessResponse({ ...user.toJSON(), tokens });
});

module.exports.signIn = catchWrap(async req => {
  const { email, password } = req.body;
  const [user, tokens] = await req.scope.resolve('AuthService').signIn(email, password);
  req.scope.resolve('ResponseService').sendSuccessResponse({ ...user.toJSON(), tokens });
});

module.exports.logout = catchWrap(async req => {
  const user = req.scope.resolve('currentUser');
  await req.scope.resolve('AuthService').logout(user);
  req.scope.resolve('ResponseService').sendSuccessResponse('OK');
});

module.exports.refresh = catchWrap(async req => {
  const { refreshToken } = req.body;
  const tokenPair = await req.scope.resolve('AuthService').refresh(refreshToken);
  req.scope.resolve('ResponseService').sendSuccessResponse(tokenPair);
});
