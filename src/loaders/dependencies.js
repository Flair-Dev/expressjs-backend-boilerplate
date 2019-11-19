const { asValue, asFunction } = require('awilix');
const MakeInjector = require('./../services/helper/injector');
const MakeAuthService = require('./../services/auth.service');
const MakeResponseService = require('../services/response.service');
const UserModel = require('../models/user.model');
const SessionModel = require('../models/session.model');

module.exports = app => {
  // register service dependencies
  const injector = MakeInjector();
  injector.inject({
    AuthService: asFunction(MakeAuthService),
    ResponseService: asFunction(MakeResponseService),
    // inject models
    UserModel: asValue(UserModel),
    SessionModel: asValue(SessionModel),
  });


  app.use((req, res, next) => {
    req.scope = injector.createScope();
    req.scope.register({
      response: asValue(res),
    });
    return next();
  });
};
