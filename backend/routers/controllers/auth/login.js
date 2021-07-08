const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const connection = require("../../../db/db");

const login = (req, res) => {
  const { email, password } = req.body;
  let id
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
            id = found[0].id;
            const options = {
              expiresIn: "200h",
            };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            // const query_ = "SELECT * FROM users WHERE email=?"
            // const data_ = [email];
            // connection.query(query_, data_, async (err, result) => {
            res.status(200).json({ token: token, user_id: id });
            // })

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
