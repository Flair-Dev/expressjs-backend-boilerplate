const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const crypto = require('crypto');
const config = require('../config/env');
const { NotAuthorizedError } = require('./../utils/error-handler/api-errors');


module.exports = MakeAuthService = ({ SessionModel, UserModel }) => {
  const _jwtRefreshSign = async (userId) => {
    const refreshToken = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(30, 'days').toDate();
    await SessionModel.create({
      token: refreshToken,
      expires,
      userId,
    });

    return refreshToken;
  };


  const _jwtAccessSign = (userId) => jwt.sign({ id: userId }, config.env.SECRET_KEY, { expiresIn: config.env.JWT_EXPIRATION_INTERVAL });

  async function _issueTokenPair(userId) {

    return {
      token: _jwtAccessSign(userId),
      refreshToken: await _jwtRefreshSign(userId),
    };
  }

  return {

    async signUp(userDTO) {
      const { email, password } = userDTO;

      const user = await UserModel.create(userDTO);

      return this.signIn(email, password, user);
    },

    signIn: async (email, password, user) => {
      if (!user) user = await UserModel.findUserByEmail(email);

      if (!user) throw new NotAuthorizedError('Invalid password or email');

      const { token, refreshToken } = await _issueTokenPair(user._id);

      const matchPassword = await user.comparePassword(password);

      if (!matchPassword) throw new NotAuthorizedError('Invalid password or email');

      const tokens = {
        refreshToken,
        token,
      };

      return [user, tokens];
    },

    logout: async (user) => {
      await SessionModel.deleteMany({
        userId: user._id,
      });
    },

    refresh: async _refreshToken => {
      const refreshObject = await SessionModel.findOne({
        token: _refreshToken,
      });

      if (!refreshObject) throw new NotAuthorizedError();

      if (moment(refreshObject.expires).isBefore()) throw new NotAuthorizedError('Refresh token is expired');

      await SessionModel.deleteMany({
        token: _refreshToken,
      });

      return _issueTokenPair(refreshObject.userId);
    },
  };
};
