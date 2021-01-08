const repository = require('../data/commentRespository');

module.exports = {
  update_comment: (req, res) => {
    const { bugId } = req.params;
    const { commentId } = req.params;
    repository.UpdateComment(bugId, commentId, req.body)
      .then((comment) => {
        res.status(204).send(comment);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  insert_comment: (req, res) => {
    const { bugId } = req.params;
    const comment = req.body;
    comment.user = req.user.id;
    repository.InsertComment(bugId, comment)
      .then((commentData) => {
        res.status(200).send(commentData);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  delete_comment: (req, res) => {
    const { bugId } = req.params;
    const { commentId } = req.params;
    repository.DeleteCommentByID(bugId, commentId)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  get_comments: (req, res) => {
    repository.GetAllComments(req.params.bugId)
      .then((comments) => {
        res.status(200).send(comments);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },
};
