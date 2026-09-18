const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controllers');
const authenticateToken = require('../middleware/authenticate-middleware');
const authorizeRoles = require('../middleware/authorize-middleware');

router.get('/', authenticateToken, authorizeRoles('admin'), userController.getAllUsers);

module.exports = router;