const express = require('express');

const controller = require('../controllers/workspaceController');
const authenticator = require('../authentication/authenticator');

const router = express.Router();

router.get('/getInvitedSpaces', authenticator.authenticateToken, controller.get_invited_workspaces_by_userid);

module.exports = router;
