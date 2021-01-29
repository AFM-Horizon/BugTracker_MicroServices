const authSchema = require('./authSchemas');
const database = require('./database');

module.exports = (() => {
  const UserModel = authSchema.userModel;

  database.GetDbInstance();

  async function _getUser(userQuery) {
    return UserModel.findOne(userQuery);
  }

  async function _deleteCollection() {
    await UserModel.deleteMany();
  }

  async function _insertUser(user) {
    const userModel = new UserModel(user);
    return userModel.save();
  }

  async function _getUserByUsername(username) {
    return authSchema.userModel.find({ username: RegExp(`^${username}`, 'i') });
  }

  async function _getUserById(id) {
    return authSchema.userModel.findById(id);
  }

  return {
    GetUserByUsername(username) {
      return _getUserByUsername(username);
    },
    GetUser(userQuery) {
      return _getUser(userQuery);
    },
    GetUserById(id) {
      return _getUserById(id);
    },
    DeleteCollection() {
      return _deleteCollection();
    },
    InsertUser(user) {
      return _insertUser(user);
    }
  };
})();
