const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
const { expect } = chai;
const UserModel = require('../../src/models/user.model');
const SessionModel = require('../../src/models/session.model');
const { userMock } = require('../../src/mock/mock.data');
chai.use(chaiAsPromised);


// auth service
const MakeAuthService  = require('../../src/services/auth.service');
const AuthService = MakeAuthService({ UserModel, SessionModel });

describe('authService tests', () => {

  it(' "test signIn" -> should return valid user data and auth tokens if artist exist in database', async () => {
    const [user, tokens] = await AuthService.signIn(userMock.email, userMock.password);
    expect(user.toJSON()).to.have.all.keys('firstName', 'lastName', 'email');
    expect(tokens).to.have.all.keys('token', 'refreshToken');
  });

  it(' "test signIn" -> should be error if user doesn\'t exist', async () => {
    return expect(AuthService.signIn(faker.internet.email(), userMock.password))
      .to
      .be
      .rejectedWith('Invalid password or email');
  });

  it(' "test signIn" -> should be error if invalid password', async () => {
    return expect(AuthService.signIn(userMock.email, faker.internet.password()))
      .to
      .be
      .rejectedWith('Invalid password or email');
  });

});
