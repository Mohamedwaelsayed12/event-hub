const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const multerUpload = require("../middleware/multer");

// POST /api/v1/auth/signup
router.post("/signup", multerUpload.single("imageUrl"), authControllers.signup);

// POST /api/v1/auth/signin
router.post("/signin", authControllers.signin);

// POST /api/v1/auth/login
router.post("/login", authControllers.signin);

module.exports = router;