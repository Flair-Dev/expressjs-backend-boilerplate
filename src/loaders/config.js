const config = require('../config/env');
const { flatObject } = require('./../utils/helpers');

module.exports = () => {
  const flatConfig = flatObject(config);
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(flatConfig)) {
    if (value === undefined) {
      throw new Error(`env error: missing ${key} param`);
    }
  }
};
