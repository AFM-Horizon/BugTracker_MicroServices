const express = require('express');
const chroma = require('chroma-log');
const cors = require('cors');

const bugRouter = require('./routes/bug-routes');
const authRouter = require('./routes/auth-routes');
const tagRouter = require('./routes/tag-routes');
const workspaceRouter = require('./routes/workspace-routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(chroma);

app.use('/auth', authRouter);
app.use('/bugs', bugRouter);
app.use('/tags', tagRouter);
app.use('/workspaces', workspaceRouter);

module.exports = app;
