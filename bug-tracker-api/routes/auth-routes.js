const express = require('express');
const authController = require('../controllers/authController');
const authenticator = require('../authentication/authenticator');

const router = express.Router();

router.post('/register', authController.register_a_user_post);
router.post('/login', authController.login_a_user_post);
router.post('/token', authController.refresh_token_post);
router.post('/logout', authController.invalidate_token_delete);
router.get('/search/:username', authenticator.authenticateToken, authController.get_user_by_username);
router.get('/getById/:id', authenticator.authenticateToken, authController.get_user_by_id);

module.exports = router;
