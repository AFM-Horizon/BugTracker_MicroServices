const jwt = require('jsonwebtoken');
const repo = require('../data/authRepository');
const authHelper = require('../authentication/authHelper');
const authenticator = require('../authentication/authenticator');
const tokenRepo = require('../data/tokenRepository');
const authRepository = require('../data/authRepository');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  register_a_user_post: async (req, res) => {
    const user = await authHelper.createEncryptedUser(req.body.username, req.body.password);
    repo.InsertUser(user)
      .then(() => {
        authenticator.authenticate(req.body.username, req.body.password)
          .then((userReturn) => {
            res.status(201);
            res.json({
              message: 'Registration Successful',
              user: userReturn
            });
          })
          .catch((err) => {
            res.status(500).send({ error: err });
          });
      })
      .catch((err) => {
        let errMsg = err;
        if (err.code === 11000) {
          errMsg = 'That Username Is Already Taken';
          res.status(500).send(errMsg);
        }
      });
  },

  login_a_user_post: (req, res) => {
    authenticator.authenticate(req.body.username, req.body.password)
      .then((userReturn) => {
        const user = {
          id: userReturn._id,
          username: userReturn.username
        };
        tokenRepo.DeleteTokenByUserId(user.id);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        tokenRepo.InsertToken({ token: refreshToken, userId: user.id })
          .then(() => {
            res.status(200);
            res.json({ accessToken, refreshToken });
          })
          .catch((err) => {
            res.status(401).send({ error: `token is not being tracked ${err}` });
          });
      })
      .catch((err) => {
        res.status(401).send({ error: err });
      });
  },

  refresh_token_post: async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
      return res.sendStatus(401);
    }
    const result = await tokenRepo.GetToken(req.body.token);
    if (result == null) {
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = generateAccessToken({ id: user.id, username: user.username });
      return res.json({ accessToken });
    });
  },

  invalidate_token_delete: (req, res) => {
    tokenRepo.DeleteToken(req.body.token);
    res.sendStatus(204);
  },

  get_user_by_username: (req, res) => {
    authRepository
      .GetUserByUsername(req.params.username)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }
};
