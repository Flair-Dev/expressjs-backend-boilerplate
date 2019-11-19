const mongoose = require('mongoose');
const config = require('./../config/env');

module.exports = async () => {
  const connection = await mongoose.connect(config.db.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);
  return connection.connection.db;
};
