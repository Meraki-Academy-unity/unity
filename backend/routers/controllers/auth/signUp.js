const connection = require("../../../db/db");

const signUp = (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    region,
    currently_in,
    language,
    gender,
    birth_date,
    display_name,
    profile_image,
  } = req.body;
  const query = `INSERT INTO users (first_name,last_name,email,password,region,currently_in,language,gender,birth_date,profile_image,display_name) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?)`;
  const data = [
    first_name,
    last_name,
    email,
    password,
    region,
    currently_in,
    language,
    gender,
    birth_date,
    profile_image,
    display_name,
  ];
  connection.query(query, data, (err, results) => {
    if (results) res.status(201).json(results);
    else res.status(400).json(err);
  });
};

module.exports = {
  signUp,
};
