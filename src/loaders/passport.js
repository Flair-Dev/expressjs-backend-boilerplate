const passport = require('passport');
const { jwtStrategy } = require('./../config/jwt/jwt.strategy');

module.exports = (app) => {
  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);
};
