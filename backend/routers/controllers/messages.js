const db = require("../../db/db");

const addMessages = (req, res) => {
  const { room, content } = req.body;
  const user_id = req.token.user_id;
  const query = `INSERT INTO messages (sender_id, content, room_id) VALUES (?,?,?)`;
  const data = [user_id, content, room];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

const showMessages = (req, res) => {
  const user_id = req.token.user_id;
  const { room } = req.body;
  const query =
    "SELECT messages.content, users.first_name, users.profile_image FROM messages INNER JOIN users ON users.id=messages.sender_id WHERE messages.room_id = ?";
  const data = [user_id, room];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

module.exports = {
  addMessages,
  showMessages,
};
