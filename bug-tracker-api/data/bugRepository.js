const bugObject = require('./bugSchemas');
const database = require('./database');

module.exports = (() => {
  const BugModel = bugObject.bugModel;

  database.GetDbInstance();

  async function _insertBugCollection(bugs) {
    await BugModel.insertMany(bugs);
  }

  async function _insertSingleBug(bug) {
    const bugModel = new BugModel(bug);
    return bugModel.save();
  }

  async function _getAllBugs(workspaceId) {
    return BugModel.find({ archived: false, workspace: workspaceId }).populate('comments.user');
  }

  async function _deleteCollection() {
    return BugModel.deleteMany();
  }

  async function _getBugByID(id) {
    return BugModel.findById(id).populate('comments.user');
  }

  async function _addTag(id, tag) {
    const bug = await _getBugByID(id);
    bug.tags.push(tag);
    bug.save();
  }

  async function _updateBug(id, bug) {
    return BugModel.findByIdAndUpdate(
      id, { $set: bug }, { upsert: false, new: true }, null
    );
  }

  return {
    InsertBugCollection(bugs) {
      return _insertBugCollection(bugs);
    },
    InsertSingleBug(bug) {
      return _insertSingleBug(bug);
    },
    GetAllBugs(workspaceId) {
      return _getAllBugs(workspaceId);
    },
    DeleteCollection() {
      return _deleteCollection();
    },
    GetBugByID(id) {
      return _getBugByID(id);
    },
    UpdateBug(id, bug) {
      return _updateBug(id, bug);
    },
    AddTag(id, tag) {
      return _addTag(id, tag);
    }
  };
})();
