const jwt = require('jsonwebtoken');
const repository = require('../data/authRepository');
const authHelper = require('./authHelper');

require('dotenv').config();

module.exports = {
  authenticate: (username, password) => {
    const prom = (resolve, reject) => {
      repository.GetUser({ username })
        .then((dbUser) => {
          if (!dbUser) {
            reject(new Error('User Is Null'));
          } else {
            authHelper.comparePassword(password, dbUser.password)
              .then((result) => {
                if (!result) {
                  reject(new Error('Incorrect Password'));
                } else {
                  resolve(dbUser);
                }
              })
              .catch((err) => {
                return reject(err);
              });
          }
        })
        .catch((err) => {
          return reject(err);
        });
    };
    return new Promise(prom);
  },

  authenticateToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      console.log('Token Was Null!');
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }
};
