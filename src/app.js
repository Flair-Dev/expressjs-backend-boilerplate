const express = require('express');
const config = require('./config/env');

async function startServer() {
  // singleton
  if (startServer.instance) return startServer.instance;
  const app = express();
  startServer.instance = app;

  await require('./loaders')(app);
  app.listen(config.env.PORT, err => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    console.info(`Server listening on port: ${config.env.PORT}`);
  });

  return app;
}

startServer().catch(e => {
  console.error(e);
  process.exit(1);
});

process
  .on('unhandledRejection', (reason, p) => {
    console.warn(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

module.exports = startServer;
