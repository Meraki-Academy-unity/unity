const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SECRET;

const authentication = (req, res, next) => {
  if (!req.header("Authorization")) {
    return res.status(403).json({ message: "forbidden" });
  }
  const token = req.header("Authorization").split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      return res.status(404).json({ message: "forbidden" });
    }
    if (result) {
      req.token = result;
      next();
    }
  });
};

module.exports = authentication;
