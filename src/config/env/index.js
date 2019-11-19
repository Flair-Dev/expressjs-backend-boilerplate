const path = require('path');
const BASE_PATH = path.join(__dirname, './../../../');
require('dotenv').config({ path: path.join(BASE_PATH, '.env') });

module.exports = {
  db: {
    MONGO_URL: process.env.MONGO_URL,
  },
  env: {
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_EXPIRATION_INTERVAL: process.env.JWT_EXPIRATION_INTERVAL || '15m',
  },

  app: {
    ICON_UPLOAD_FOLDER: process.env.ICON_UPLOAD_FOLDER || 'uploads/',
  },
};
