const connection = require("../../db/db");

const getUserById = (req, res) => {
  const user_id = req.params.id;
  const query = `SELECT * FROM users WHERE id = ?`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(404).json(err);
  });
};

const getMyProfile = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT * FROM users WHERE id = ?`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(404).json(err);
  });
};

module.exports = { getUserById, getMyProfile };
