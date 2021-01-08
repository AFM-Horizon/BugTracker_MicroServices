const mongoose = require('mongoose');
const comment = require('./commentSchemas');

const { commentSchema } = comment;

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  colour: { type: String, required: true }
});

const bugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  status: { type: String, required: true },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace' },
  description: { type: String },
  tags: [tagSchema],
  date: { type: Date, default: Date.now() },
  comments: [commentSchema],
  archived: { type: Boolean, default: false }
});

const bugModel = mongoose.model('bugs', bugSchema);

module.exports = {
  bugSchema,
  bugModel
};
