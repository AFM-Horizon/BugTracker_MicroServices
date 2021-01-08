const repository = require('../data/bugRepository');

module.exports = {
  get_all_bugs: (req, res) => {
    repository
      .GetAllBugs(req.params.workspaceId)
      .then((bugs) => {
        res.status(200).send(bugs);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  get_bug_by_id: (req, res) => {
    repository
      .GetBugByID(req.params.id)
      .then((bug) => {
        res.status(200).json(bug);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  create_bug_post: (req, res) => {
    const { bug } = req.body;
    repository
      .InsertSingleBug(bug)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  update_bug: (req, res) => {
    const { id } = req.params;
    const bug = req.body;
    console.log(`Bug${JSON.stringify(bug)}`);
    repository
      .UpdateBug(id, bug)
      .then((data) => {
        res.status(204).send(data);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },
};
