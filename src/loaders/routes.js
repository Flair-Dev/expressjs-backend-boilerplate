const {
  authRouter,
  userRouter,
} = require('./../api');

function routes(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  console.info('routes set');
}

module.exports = routes;
