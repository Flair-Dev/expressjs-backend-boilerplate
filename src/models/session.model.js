const { Schema } = require('mongoose');
const SessionSchemaJSON = require('./schemas/session.schema');
const ModelProvider = require('./helper/model.provider');
const sessionSchema = new Schema(SessionSchemaJSON);

module.exports = ModelProvider.getModel('Session', sessionSchema);
