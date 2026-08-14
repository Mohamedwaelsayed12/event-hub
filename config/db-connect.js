const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(`Database Connection Error: ${error.message}`);
  }
};

module.exports = dbConnect;