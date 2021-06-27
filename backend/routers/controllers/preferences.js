const connection = require("../../db/db");

const addPreference = (req, res) => {
  const {
    location,
    start_date,
    finish_date,
    activities,
    similar_age,
    same_gender,
    user_id,
  } = req.body;
  const query = `INSERT INTO preferences (location,start_date,finish_date,activities,similar_age,same_gender,user_id) VALUES (?,?,?,?,?,?,?)`;
  const data = [
    location,
    start_date,
    finish_date,
    activities,
    similar_age,
    same_gender,
    user_id,
  ];

  connection.query(query, data, (err, result) => {
    if (result) res.status(201).json("Preference Added Successfully!");
    else res.status(400).json("ERROR OCCURRED !");
  });
};

const deletePreference = (req, res) => {
  const user_id = req.body.user_id;
  const query = `DELETE FROM preferences WHERE user_id=?`;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json("Preference Deleted Successfully!");
    else res.status(400).json("ERROR OCCURRED !");
  });
};

const showPreferenceById = (req, res) => {
  const user_id = req.body.user_id;
  const query = `SELECT * FROM preferences WHERE user_id = ?`;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR OCCURRED !");
  });
};

module.exports = { addPreference, deletePreference, showPreferenceById };
