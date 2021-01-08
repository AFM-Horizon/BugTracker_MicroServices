const express = require('express');
const authenticator = require('../authentication/authenticator');
const tagController = require('../controllers/tagController');

const router = express.Router();

router.post('/:bugId/tag', authenticator.authenticateToken, tagController.add_tag);
router.get('/:bugId/tag', authenticator.authenticateToken, tagController.get_all_tags);
router.get('/:bugId/tag/:id', authenticator.authenticateToken, tagController.get_tag_by_id);
router.delete('/:bugId/tag/:id', authenticator.authenticateToken, tagController.delete_tag);
router.patch('/:bugId/tag/:id', authenticator.authenticateToken, tagController.update_tag);

module.exports = router;
