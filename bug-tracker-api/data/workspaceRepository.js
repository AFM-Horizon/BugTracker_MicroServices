const mongoose = require('mongoose');
const workspaceSchema = require('./workspaceSchemas');
const database = require('./database');

module.exports = (() => {
  const WorkspaceModel = workspaceSchema.model;
  database.GetDbInstance();

  async function _getWorkspaceById(id) {
    return WorkspaceModel.findOne({ id });
  }

  async function _getWorkspacesForUser(userId) {
    return WorkspaceModel.find({ owner: userId });
  }

  async function _createWorkspace(userId, workspace) {
    const workspaceClone = workspace;
    if (!workspace.owner) {
      workspaceClone.owner = userId;
    }
    const workspaceModel = new WorkspaceModel(workspaceClone);
    return workspaceModel.save();
  }

  async function _updateWorkspace(id, workspace) {
    return WorkspaceModel.findByIdAndUpdate(
      // eslint-disable-next-line max-len
      { _id: mongoose.Types.ObjectId(id) }, { $set: { permissions: workspace.workspace.permissions } }, { upsert: false, new: true, useFindAndModify: false }, null
    );
  }

  return {
    GetWorkspaceById(id) {
      return _getWorkspaceById(id);
    },
    GetWorkspacesForUser(userId) {
      return _getWorkspacesForUser(userId);
    },
    CreateWorkspace(userId, workspace) {
      return _createWorkspace(userId, workspace);
    },
    UpdateWorkspace(id, workspace) {
      return _updateWorkspace(id, workspace);
    }
  };
})();
