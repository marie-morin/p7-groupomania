const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    console.log("------------------ auth");
    // console.log("req.headers.authorization : ", req.headers.authorization);
    const header = req.headers.authorization;
    // console.log("header : ", header);
    let token;

    if (header.split(" ").length > 1) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      token = header;
    }
    console.log("token : ", token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (!userId) {
      throw "userId non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error || "Requête non authentifiée !" });
  }
};
