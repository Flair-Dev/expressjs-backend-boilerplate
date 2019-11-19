const passport = require('passport');
const { asValue } = require('awilix');
const { promisify } = require('util');
const { NotAuthorizedError } = require('../utils/error-handler/api-errors');

// eslint-disable-next-line no-unused-vars
const handleJWT = (req, res, next, role) => async (err, user, info) => {
  const error = err || info;
  const logIn = promisify(req.logIn);
  try {
    if (error) {
      return next(new NotAuthorizedError(error.message));
    }

    if (!user) {
      return next(new NotAuthorizedError('user not found'));
    }
    await logIn(user, { session: false });
  } catch (e) {
    return next(new NotAuthorizedError(e.message));
  }
  // register artist in scope
  req.scope.register({
    currentUser: asValue(user),
  });

  return next();
};

const isAuth = (role = 'user') => (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  handleJWT(req, res, next, role),
)(req, res, next);

module.exports = isAuth;
