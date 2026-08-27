const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/get-jwt");

// Optional utility if file upload cleanup is implemented
const deleteUploadedFile = (folder, filename) => {
  // Implementation depends on your multer cleanup logic
};

// 1. User Registration (Sign Up)
const signup = async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      role: "student",
      imageUrl: req.file?.filename,
    });

    const token = generateToken(user);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      data: { user },
    });
  } catch (error) {
    if (req.file && typeof deleteUploadedFile === "function") {
      deleteUploadedFile("users", req.file.filename);
    }
    res.status(400).json({
      status: "error",
      message: `Error in signup: ${error.message}`,
    });
  }
};

// 2. User Login (Sign In)
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and Password are required.",
      });
    }

    // Explicitly select password field since select: false is set in schema
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const comparePasswords = await bcryptjs.compare(password, user.password);
    if (!comparePasswords) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    // Remove password from response payload
    user.password = undefined;

    const token = generateToken(user);

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in signin: ${error.message}`,
    });
  }
};

module.exports = { signup, signin };