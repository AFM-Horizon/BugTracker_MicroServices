const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const seedData = require('../data/seedUserData');
const tokenRepo = require('../data/tokenRepository');
const authRepository = require('../data/authRepository');

const should = chai.should();

chai.use(chaiHttp);

describe('AUTH TESTS', () => {
  beforeEach(async () => {
    await authRepository.DeleteCollection();
    await tokenRepo.DeleteCollection();
    await seedData.seed();
  });

  describe('Token Tests ->', () => {
    it('Should Delete Refresh Token', () => {
      chai
        .request(server)
        .post('/auth/login')
        .send({
          username: 'Charmander',
          password: 'password'
        })
        .end((_error, result) => {
          chai
            .request(server)
            .delete('/auth/logout')
            .send({
              token: result.body.refreshToken
            })
            .end((_err, res) => {
              res.status.should.eql(204);
              chai
                .request(server)
                .post('/auth/token')
                .send({
                  token: result.body.refreshToken
                })
                .end((_errsu, resu) => {
                  resu.status.should.eql(403);
                });
            });
        });
    });

    it('Should Return Refresh Token', () => {
      chai
        .request(server)
        .post('/auth/register')
        .send({
          username: 'Charmander',
          password: 'password'
        })
        .end(() => {
          chai
            .request(server)
            .post('/auth/login')
            .send({
              username: 'Charmander',
              password: 'password'
            })
            .end((_error, result) => {
              chai
                .request(server)
                .post('/auth/token')
                .send({
                  token: result.body.refreshToken
                })
                .end((err, res) => {
                  should.not.exist(err);
                  res.redirects.length.should.eql(0);
                  res.status.should.eql(200);
                  res.type.should.eql('application/json');
                  res.body.accessToken.should.not.eql(null);
                });
            });
        });
    });
  });

  describe('Login Tests ->', () => {
    it('Login_ShouldLoginUser', () => {
      chai
        .request(server)
        .post('/auth/login')
        .send({
          username: 'Charmander',
          password: 'password'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.accessToken.should.not.eql(null);
          res.body.refreshToken.should.not.eql(null);
        });
    });

    it('Login_ShouldFail', () => {
      chai
        .request(server)
        .post('/auth/login')
        .send({
          username: 'Charmander',
          password: 'password!?!???'
        })
        .end((_err, res) => {
          res.redirects.length.should.eql(0);
          res.status.should.eql(401);
          res.type.should.eql('application/json');
        });
    });

    describe('Register Tests ->', () => {
      it('Register_ShouldRegisterUser', (done) => {
        chai
          .request(server)
          .post('/auth/register')
          .send({
            username: 'Bob',
            password: 'password',
          })
          .end((err, res) => {
            should.not.exist(err);
            res.redirects.length.should.eql(0);
            res.status.should.eql(201);
            res.type.should.eql('application/json');
            res.body.user.username.should.eql('Bob');
            res.body.user.password.should.not.eql(null);
            done();
          });
      });

      it('Register_ShouldNotAllowDuplicateUsername', (done) => {
        chai
          .request(server)
          .post('/auth/register')
          .send({
            username: 'Charmander',
            password: 'password',
          })
          .end((_err, res) => {
            res.text.should.be.eql('That Username Is Already Taken');
            done();
          });
      });
    });
  });
});
