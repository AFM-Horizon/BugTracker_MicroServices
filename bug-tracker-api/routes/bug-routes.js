const express = require('express');
const bugController = require('../controllers/bugController');
const testController = require('../controllers/testBugController');
const commentController = require('../controllers/commentController');
const authenticator = require('../authentication/authenticator');

const router = express.Router();

// #region
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   Bearer:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
// #endregion

// #region
/**
 * @swagger
 * definitions:
 *   Bug:
 *     properties:
 *       name:
 *         type: string
 *       author:
 *         type: string
 *       status:
 *         type: string
 *       description:
 *         type: string
 *       tags:
 *         items:
 *           $ref: '#/definitions/Tag'
 *       date:
 *         type: date
 *       comments:
 *         items:
 *           $ref: '#/definitions/Comment'
 *       archived:
 *         type: boolean
 */
// #endregion
// #region
/**
 * @swagger
 * definitions:
 *   Comment:
 *     properties:
 *       comment:
 *         type: string
 *       user:
 *         type: string
 *       likes:
 *        items:
 *          type: object
 *          properties:
 *            user:
 *              type: string
 *       date:
 *         type: date
 */
// #endregion
// #region
/**
 * @swagger
 * definitions:
 *   Tag:
 *     properties:
 *       name:
 *         type: string
 *       colour:
 *         type: string
 */
// #endregion

// #region
/**
 * @swagger
 * /bugs/getAll:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Bugs
 *     description: Returns all Bugs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Bugs
 *         schema:
 *           $ref: '#/definitions/Bug'
 */
// #endregion
router.get('/:workspaceId/getAll', authenticator.authenticateToken, bugController.get_all_bugs);

// #region
/**
 * @swagger
 * /bugs/getById/{id}:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Bugs
 *     description: Returns a single Bug
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Bug's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single bug
 *         schema:
 *           $ref: '#/definitions/Bug'
 */
// #endregion
router.get('/getById/:id', authenticator.authenticateToken, bugController.get_bug_by_id);

// #region
/**
 * @swagger
 * /bugs/add:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Bugs
 *     description: Creates a new bug
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bug
 *         description: Bug object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Bug'
 *     responses:
 *       201:
 *         description: Created at route
 */
// #endregion
router.post('/add', authenticator.authenticateToken, bugController.create_bug_post);

// #region
/**
 * @swagger
 * /bugs/update/{id}:
 *   patch:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Bugs
 *     description: Updates an existing bug resource
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bug
 *         description: Fields for the Bug resource
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Bug'
 *     responses:
 *       200:
 *         description: bug updated
 */
// #endregion
router.patch('/update/:id', authenticator.authenticateToken, bugController.update_bug);

// Testing Only
router.get('/save', testController.create_bug);
router.get('/seed', testController.seed_data);

// Comments
// #region
/**
 * @swagger
 * /bugs/{bugId}/comments/getAll:
 *   get:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Comments
 *     description: Returns the array of comments for a given bug
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bugId
 *         description: Bug's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The array of comments for a given bug
 *         schema:
 *           $ref: '#/definitions/Comment'
 */
// #endregion
router.get('/:bugId/comments/getall', authenticator.authenticateToken, commentController.get_comments);

// #region
/**
 * @swagger
 * /bugs/{bugId}/comments/add:
 *   post:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Comments
 *     description: Adds a new comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bugId
 *         description: Bug's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: comment
 *         description: Comment
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Comment'
 *     responses:
 *       200:
 *         description: Comment added
 *         schema:
 *           $ref: '#/definitions/Comment'
 */
// #endregion
router.post('/:bugId/comments/add', authenticator.authenticateToken, commentController.insert_comment);

// #region
/**
 * @swagger
 * /bugs/{bugId}/comments/update/{commentId}:
 *   patch:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Comments
 *     description: Updates a comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bugId
 *         description: Bug's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: comment
 *         description: Comment
 *         in: path
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Comment'
 *       - name: commentId
 *         description: Comment's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Comment added
 */
// #endregion
router.patch('/:bugId/comments/update/:commentId', authenticator.authenticateToken, commentController.update_comment);

// #region
/**
 * @swagger
 * /bugs/{bugId}/comments/update/{commentId}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Comments
 *     description: Deletes a comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bugId
 *         description: Bug's id
 *         in: path
 *         required: true
 *         type: string
 *       - name: commentId
 *         description: Comment's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: No Content
 */
// #endregion
router.delete('/:bugId/comments/delete/:commentId', authenticator.authenticateToken, commentController.delete_comment);

module.exports = router;
