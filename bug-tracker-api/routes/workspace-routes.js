const express = require('express');
const controller = require('../controllers/workspaceController');
const authenticator = require('../authentication/authenticator');

const router = express.Router();

router.get('/getAll/:userId', authenticator.authenticateToken, controller.get_workspaces_by_userid);
router.get('/getById/:id', authenticator.authenticateToken, controller.get_workspace_by_id);
router.post('/:userId', authenticator.authenticateToken, controller.create_workspace);
router.patch('/:id', authenticator.authenticateToken, controller.update_workspace);

module.exports = router;
