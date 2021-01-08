const express = require('express');
const authController = require('../controllers/authController');
const authenticator = require('../authentication/authenticator');

const router = express.Router();

// #region
/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */
// #endregion

// #region
/**
 * @swagger
 * definitions:
 *   Token:
 *     properties:
 *       token:
 *         type: string
 */
// #endregion

// #region
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     description: Registers a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: username
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Created at route
 */
// #endregion
router.post('/register', authController.register_a_user_post);

// #region
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Logs in a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: logged in
 *       401:
 *         description: Unauthorized
 */
// #endregion
router.post('/login', authController.login_a_user_post);

// #region
/**
 * @swagger
 * /auth/token:
 *   post:
 *     tags:
 *       - Auth
 *     description: Refreshes an access token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Token'
 *     responses:
 *       201:
 *         description: refreshed access token
 */
// #endregion
router.post('/token', authController.refresh_token_post);

// #region
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     description: invalidates a refresh token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Token'
 *     responses:
 *       204:
 *         description: no content
 */
// #endregion
router.post('/logout', authController.invalidate_token_delete);

router.get('/search/:username', authenticator.authenticateToken, authController.get_user_by_username);

module.exports = router;
