const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
  date: { type: Date, default: Date.now() },
  permissions: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
  ]
});

const model = mongoose.model('workspace', workspaceSchema);

module.exports = {
  workspaceSchema,
  model
};
