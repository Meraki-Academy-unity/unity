const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const connection = require("../../../db/db");

const login = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const query = "SELECT * FROM users WHERE email = ?;";
    const data = [email.toLowerCase()];
    connection.query(query, data, async function (error, found) {
      if (found.length > 0) {
        await bcrypt.compare(password, found[0].password, (err, result) => {
          if (err) {
            res.json(err);
          }
          if (result) {
            const payload = {
              user_id: found[0].id,
            };
            const options = {
              expiresIn: "200h",
            };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);

            res.status(200).json({ token: token });
          } else {
            res.status(403).json("Incorrect Email or Password!");
          }
        });
      } else {
        res.status(403).json("Incorrect Email or Password!");
      }
    });
  } else {
    res.status(403).json("Please enter Email and Password!");
  }
};

module.exports = {
  login,
};
