const User = require("../modules/user"); // Ensure path matches your User model

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error fetching profile: ${error.message}`,
    });
  }
};

module.exports = { getProfile };