//import
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = {
  generateToken: function (user) {
    return jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      "process.env.JWT_SECRET_TOKEN",
      { expiresIn: "24h" }
    );
  },
  getUserId: function (data) {
    if (data !== null) {
      try {
        const token = jwt.verify(
          data.split(" ")[1],
          "process.env.JWT_SECRET_TOKEN"
        );
        return token.userId;
      } catch (err) {
        return err;
      }
    }
  },
};
