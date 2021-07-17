const connection = require("../../db/db");

const addFriend = (req, res) => {
  const friend_id = req.params.id;
  const user_id = req.token.user_id;
  const query = `INSERT INTO friend_list (user_id,friend_id) VALUES (?,?)`;
  const data = [user_id, friend_id];
  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

const deleteFriend = (req, res) => {
  const friend_id = req.params.id;
  const user_id = req.token.user_id;
  const query = `DELETE FROM friend_list WHERE user_id=? AND friend_id=?`;
  const data = [user_id, friend_id];
  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

const showFriendList = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT first_name ,last_name,profile_image,friend_id FROM users INNER JOIN friend_list ON  friend_list.friend_id=users.id WHERE user_id=?`;
  const data = [user_id, user_id];
  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json(err);
  });
};

const checkFriends = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const query = "SELECT * FROM friend_list WHERE friend_id=? AND user_id=? ";
  const data = [id, user_id];
  connection.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

module.exports = { addFriend, deleteFriend, showFriendList, checkFriends };
