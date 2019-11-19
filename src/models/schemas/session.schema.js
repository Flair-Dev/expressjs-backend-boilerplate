const { Schema } = require('mongoose');

module.exports = {
  token: {
    type: String,
    required: true,
    index: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  expires: { type: Date },
};
