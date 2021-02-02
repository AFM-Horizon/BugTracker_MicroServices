const express = require('express');
const chroma = require('chroma-log');
const cors = require('cors');

const bugRouter = require('./routes/bug-routes');
const authRouter = require('./routes/auth-routes');
const tagRouter = require('./routes/tag-routes');
const workspaceRouter = require('./routes/workspace-routes');
const workspaceRouterAlt = require('./routes/workspace-alt-routes');

const app = express();

app.use(cors({
  origin: [
    'https://ambitious-sand-06ac61800.azurestaticapps.net',
    'http://localhost:4200'
  ]
}));
app.use(express.json());

app.use(chroma);

app.use('/auth', authRouter);
app.use('/bugs', bugRouter);
app.use('/tags', tagRouter);
app.use('/workspaces-alt', workspaceRouterAlt);
app.use('/workspaces', workspaceRouter);

module.exports = app;
