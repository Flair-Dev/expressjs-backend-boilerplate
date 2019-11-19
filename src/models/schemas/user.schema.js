module.exports = {

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  icon: {
    contentType: {
      type: String,
    },
    key: {
      type: String,
    },
  },
};
