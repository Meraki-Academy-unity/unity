const db = require("../../db/db");

const addMessages = (req, res) => {
  const { room_id, content, receiver_id } = req.body;
  const user_id = req.token.user_id;
  const query = `INSERT INTO messages (room_id, content, sender_id, receiver_id) VALUES (?,?,?,?);`;
  const data = [room_id, content, user_id, receiver_id];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json(err);
  });
};

const showMessages = (req, res) => {
  //   const user_id = req.token.user_id;
  const room_id = req.params.room_id;
  const query =
    "SELECT messages.content, users.first_name, users.profile_image FROM messages INNER JOIN users ON users.id=messages.sender_id WHERE messages.room_id = ?";
  const data = [room_id];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json(err);
  });
};

const inboxMessages = (req, res) => {
  const user_id = req.token.user_id;
  const query =
    "SELECT messages.content, users.first_name, users.profile_image, messages.sender_id, messages.receiver_id FROM messages INNER JOIN users ON users.id=messages.sender_id WHERE messages.sender_id = ? OR receiver_id = ?";
  const data = [user_id, user_id];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json(err);
  });
};

module.exports = {
  addMessages,
  showMessages,
  inboxMessages,
};
