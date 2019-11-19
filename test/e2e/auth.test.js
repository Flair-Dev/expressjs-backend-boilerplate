const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const issueToken = require('./../helper/issueToken');
const startServer  = require('./../../src/app');
const dependenciesLoader = require('./../../src/loaders/dependencies');
const UserModel = require('../../src/models/user.model');
const { userMock } = require('../../src/mock/mock.data');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('auth tests', () => {
  const checkPairToken = (tokens) => {
    expect(tokens).to.be.an('object');
    expect(tokens.refreshToken).to.be.an('string');
    expect(tokens.token).to.be.an('string');
  };

  async function loginHandler() {
    return request(await startServer())
      .post('/api/auth/sign-in')
      .send({
        email: userMock.email,
        password: userMock.password,
      })
      .expect(200)
      .expect(res => checkPairToken(res.body.tokens));
  }

  before(async () => {
    const app = await startServer();
    await dependenciesLoader(app);
  });

  it('User can successfully login', async () => {
    // const app = await startServer();
    const loginRes = await loginHandler();

    await request(await startServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: loginRes.body.tokens.refreshToken })
      .expect(200)
      .expect(res => checkPairToken(res.body));
  });

  it('User gets 401 on invalid credentials', async () => {
    await request(await startServer())
      .post('/api/auth/sign-in')
      .send({
        email: userMock.email,
        password: 'INVALID',
      })
      .expect(401);
  });

  it('User receives 401 on expired token', async () => {
    const user = await UserModel.findOne({ email: userMock.email }).exec();
    const expiredToken = issueToken({ id: user._id }, { expiresIn: '1ms' });
    await request(await startServer())
      .get('/api/users/me')
      .set('Authorization', `Bearer ${expiredToken}`)
      .expect(401)
      .expect(res => {
        expect(res.body.message).to.equal('jwt expired');
      });
  });

  it('User can use refresh token only once', async () => {
    const loginRes = await loginHandler();

    // firstResp
    await request(await startServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: loginRes.body.tokens.refreshToken })
      .expect(200)
      .expect(res => checkPairToken(res.body));

    // secondResp
    await request(await startServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: loginRes.body.tokens.refreshToken })
      .expect(401);
  });

  it('Multiple refresh tokens are valid', async () => {
    const firstLoginResp = await loginHandler();
    const secondLoginResp = await loginHandler();

    expect(firstLoginResp.status).to.equal(200);
    expect(secondLoginResp.status).to.equal(200);

    // first refresh response
    await request(await startServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: firstLoginResp.body.tokens.refreshToken })
      .expect(200)
      .expect(res => checkPairToken(res.body));

    // second refresh response
    await request(await startServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: secondLoginResp.body.tokens.refreshToken })
      .expect(200)
      .expect(res => checkPairToken(res.body));
  });

  it('Refresh tokens become invalid on logout', async () => {
    const loginRes = await loginHandler();
    // logout resp
    await request(await startServer())
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${loginRes.body.tokens.token}`)
      .expect(200);

    // send invalid refresh token
    await  request(await startServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: loginRes.body.tokens.refreshToken })
      .expect(401);
  });
});
