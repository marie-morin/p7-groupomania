//import
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = {
  generateToken: function (user) {
    return jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      "process.env.JWT_SECRET_TOKEN",
      {
        expiresIn: "24h",
      }
    );
  },
};
