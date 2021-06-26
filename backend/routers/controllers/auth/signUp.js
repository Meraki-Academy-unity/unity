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
  } = req.body;
  const query = `INSERT INTO users (first_name,last_name,email,password,region,currently_in,language,gender) VALUES (?, ?, ?, ?,?,?,?,?)`;
  const data = [
    first_name,
    last_name,
    email,
    password,
    region,
    currently_in,
    language,
    gender,
  ];
  connection.query(query, data, (err, results) => {
    if (results) res.status(201).json(result);
    else res.status(400).json(err);
  });
};

module.exports = {
  signUp,
};
