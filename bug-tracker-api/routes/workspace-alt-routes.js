const express = require('express');

const controller = require('../controllers/workspaceController');
const authenticator = require('../authentication/authenticator');

const router = express.Router();

router.get('/getInvitedSpaces/:userId', authenticator.authenticateToken, controller.get_workspaces_by_userid);

module.exports = router;