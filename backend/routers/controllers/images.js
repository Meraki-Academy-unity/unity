const db = require("../../db/db");

const addImage = (req, res) => {
  const { image } = req.body;
  const user_id = req.token.user_id;
  const query = `INSERT INTO images (user_id,images) VALUES (?,?)`;
  const data = [user_id, image];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

const getImageByUserId = (req, res) => {
  const user_id = req.token.user_id;
  const query =
    "SELECT images FROM images INNER JOIN users ON users.id=images.user_id AND images.user_id=?";
  const data = [user_id];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

const getImageByGestId = (req, res) => {
  const id = req.params.id;
  const query =
    "SELECT images FROM images INNER JOIN users ON users.id=images.user_id AND images.user_id=?";
  const data = [id];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

module.exports = {
  addImage,
  getImageByUserId,
  getImageByGestId,
};
