const joi = require('joi');

module.exports = {
  signUpUser: {
    body: {
      email: joi.string().email().required(),
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      password: joi.string().min(6).required(),
    },
  },

  signInUser: {
    body: {
      email: joi.string().email().required(),
      password: joi.string().required(),
    },
  },

  refreshToken: {
    body: {
      refreshToken: joi.string().required(),
    },
  },
};
