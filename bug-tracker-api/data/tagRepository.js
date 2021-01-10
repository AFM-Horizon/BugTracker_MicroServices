const bugObject = require('./bugSchemas');
const database = require('./database');

module.exports = (() => {
  const BugModel = bugObject.bugModel;

  database.GetDbInstance();

  async function _getAll(bugId) {
    const bug = await BugModel.findById(bugId);
    return bug.tags;
  }

  async function _getById(bugId, tagId) {
    const bug = await BugModel.findById(bugId);
    return bug.tags.find((x) => {
      return x._id === tagId;
    });
  }

  async function _addTag(bugId, tag) {
    const bug = await BugModel.findById(bugId);
    bug.tags.push(tag);
    bug.save();
  }

  async function _deleteTag(bugId, tagId) {
    const bug = await BugModel.findById(bugId);
    bug.tags.pull(tagId);
    await bug.save();
  }

  async function _updateTag(bugId, tagId, tag) {
    const set = {};
    for (const prop in tag) {
      if (Object.prototype.hasOwnProperty.call(tag, prop)) {
        set[`comments.$.${prop}`] = tag[prop];
      }
    }
    return BugModel.findOneAndUpdate(
      { _id: bugId, 'tags._id': tagId },
      { $set: set },
      { upsert: false, new: true, useFindAndModify: false },
    );
  }

  return {
    GetAllTags(bugId) {
      return _getAll(bugId);
    },
    GetTagById(bugId, tagId) {
      return _getById(bugId, tagId);
    },
    UpdateTag(bugId, tagId, tag) {
      return _updateTag(bugId, tagId, tag);
    },
    AddTag(bugId, tag) {
      return _addTag(bugId, tag);
    },
    DeleteTag(bugId, tagId) {
      return _deleteTag(bugId, tagId);
    }
  };
})();
