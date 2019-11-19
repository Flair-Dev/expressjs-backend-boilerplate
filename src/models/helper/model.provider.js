const { model, connection } = require('mongoose');

module.exports = class modelProvider {
  static getModel(modelName, schema) {
    // if model registered return existing model
    if (connection.models[modelName]) return model(modelName);

    return model(modelName, schema);
  }
};
