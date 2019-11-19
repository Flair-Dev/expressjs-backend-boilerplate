const fs = require('fs-extra');
const path = require('path');
const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const _ = require('lodash');
const ModelProvider = require('./helper/model.provider');
const config = require('../config/env');
const { userWhiteList } = require('./../config/whitelist');
const UserSchemaJSON = require('./schemas/user.schema');

const UserSchema = new Schema(UserSchemaJSON);

UserSchema.plugin(beautifyUnique);

// eslint-disable-next-line func-names
UserSchema.methods.toJSON = function () {
  // hide properties
  const obj = this.toObject();
  return _.pick(obj, userWhiteList);
};

// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();


  try {
    // generate a salt
    const salt =  await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (e) {
    next(e);
  }
});

// eslint-disable-next-line func-names
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// eslint-disable-next-line func-names
UserSchema.methods.saveImage = async function (filename, mimetype) {
  if (this.icon && this.icon.key) {
    // remove old icon
    await fs.remove(path.join(config.app.ICON_UPLOAD_FOLDER, this.icon.key))
      .catch(err => console.error(err));
  }
  this.icon = {
    contentType: mimetype,
    key: filename,
  };
  return this.save();
};

// eslint-disable-next-line func-names
UserSchema.statics.findUserByEmail = async function (email) {
  return this.model('User').findOne({ email });
};

module.exports = ModelProvider.getModel('User', UserSchema);
