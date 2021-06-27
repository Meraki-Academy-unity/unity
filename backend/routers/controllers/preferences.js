const connection = require("../../db/db");

/*
id INT AUTO_INCREMENT NOT NULL,
    location VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL,
    activities VARCHAR(255),
    similar_age BOOL default 0,
    same_gender BOOL DEFAULT 0,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
*/

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
    if (result) res.status(201).json(result);
    else res.status(400).json(err);
  });
};

const deletePreference = (req, res) => {};
const showPreferenceById = (req, res) => {};

module.exports = { addPreference, deletePreference, showPreferenceById };
