const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserModel = require('../../models/user.model');
const config = require('./../env');

const jwtOptions = {
  secretOrKey: config.env.SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};


const jwt = async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.id);

    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};


const jwtStrategy = new JwtStrategy(jwtOptions, jwt);

module.exports = {
  jwtStrategy,
  jwtPayloadMiddleware: jwt,
};
