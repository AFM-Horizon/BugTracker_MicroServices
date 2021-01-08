const repository = require('../data/tagRepository');

module.exports = {
  add_tag: (req, res) => {
    repository
      .AddTag(req.params.bugId, req.body.tag)
      .then((tag) => {
        res.status(201).send(tag);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  },

  get_all_tags: (req, res) => {
    repository
      .GetAllTags(req.params.bugId)
      .then((tags) => {
        res.status(200).send(tags);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  },

  get_tag_by_id: (req, res) => {
    repository
      .GetTagById(req.params.bugId, req.params.id)
      .then((tag) => {
        res.status(200).send(tag);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  },

  delete_tag: (req, res) => {
    repository
      .DeleteTag(req.params.bugId, req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .then((err) => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  },

  update_tag: (req, res) => {
    repository
      .UpdateTag(req.params.bugId, req.params.tagId, req.body.tag)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err });
      });
  }
};
