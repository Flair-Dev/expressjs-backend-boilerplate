const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const qs = require('qs');
const morgan = require('morgan');
const { errorHandler } = require('./../utils/error-handler');
const { NotFoundError } = require('./../utils/error-handler/api-errors');
const routes = require('./routes');

module.exports = (app) => {
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  app.set('query parser',  (str) => qs.parse(str, { comma: true }));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());

  routes(app);

  app.use((req, res, next) => {
    next(new NotFoundError());
  });
  app.use(errorHandler);
};
