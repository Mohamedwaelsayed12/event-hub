const express = require("express");
const userControllers = require("../controllers/user-controllers");
const authenticateMiddleware = require("../middleware/authenticate-middleware");

const router = express.Router();

// Protected route: requires a valid JWT token
router.get("/profile", authenticateMiddleware, userControllers.getProfile);

module.exports = router;