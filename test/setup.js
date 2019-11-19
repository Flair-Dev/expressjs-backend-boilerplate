const mongoose = require('mongoose');
const UserModel = require('../src/models/user.model');
const { userMock } = require('../src/mock/mock.data');
const mongooseLoader = require('../src/loaders/mongoose');

before(async () => {
  process.env.MONGO_URL = process.env.TEST_MONGO_URL || (() => { throw new Error('please set TEST_MONGO_URL before run tests'); })();

  await mongooseLoader();

  const user = await UserModel.findOne({ email: userMock.email });
  if (!user) {
    await UserModel.create(userMock);
  }

});

after(async () => {
  mongoose.connection.db.dropDatabase();
});
