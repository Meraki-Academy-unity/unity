const connection = require("../../db/db");

const addFriend = (req, res) => {
  const friend_id = req.params.id;
  const user_id = req.body.id;
  const query = `INSERT INTO friend_list (user_id,friend_id) VALUES (?,?)`;
  const data = [user_id, friend_id];
  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

const deleteFriend = (req, res) => {};

const showFriendList = (req, res) => {};

module.exports = { addFriend, deleteFriend, showFriendList };
