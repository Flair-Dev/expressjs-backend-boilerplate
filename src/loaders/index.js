const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const passportLoader = require('./passport');
const config = require('./config');
const dependenciesLoader = require('./dependencies');

module.exports = async (app) => {

  config();
  console.info('config loaded!');

  await dependenciesLoader(app);
  console.info('service dependencies loaded!');

  await mongooseLoader();
  console.info('DB loaded and connected!');

  await expressLoader(app);
  console.info('Express loaded');

  passportLoader(app);
  console.info('Passport loaded');

};
