const workspaceRepository = require('../data/workspaceRepository');

module.exports = {
  get_workspaces_by_userid: async (req, res) => {
    workspaceRepository
      .GetWorkspacesForUser(req.params.userId)
      .then((workspaces) => {
        res.status(200).send(workspaces);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  get_workspace_by_id: async (req, res) => {
    workspaceRepository
      .GetWorkspaceById(req.params.id)
      .then((workspace) => {
        res.status(200).send(workspace);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  create_workspace: async (req, res) => {
    workspaceRepository
      .CreateWorkspace(req.params.userId, req.body.workspace)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  update_workspace: async (req, res) => {
    workspaceRepository
      .UpdateWorkspace(req.params.id, req.body)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }
};
