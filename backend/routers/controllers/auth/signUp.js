const connection = require("../../../db/db");
const bcrypt = require("bcrypt");

const signUpFirstStep = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (first_name,last_name,email,password) VALUES (?,?, ?,?);`;
  const data = [first_name, last_name, email.toLowerCase(), hashedPassword];
  connection.query(query, data, (err, results) => {
    if (results) res.status(201).json(results);
    else res.status(400).json(err);
  });
};

const signUpSecondStep = (req, res) => {
  const {
    id,
    region,
    currently_in,
    language,
    gender,
    birth_date,
    profile_image,
    display_name,
  } = req.body;

  const query = `
  UPDATE users
  SET region=?, currently_in=?,language=?,
  gender=?,birth_date=?,profile_image=?,is_completed=?,display_name=?
  WHERE id=?;`;
  const data = [
    region,
    currently_in,
    language,
    gender,
    birth_date,
    profile_image,
    1,
    display_name,
    id,
  ];
  connection.query(query, data, (err, results) => {
    if (results) res.status(201).json(results);
    else res.status(400).json(err);
  });
};

module.exports = {
  signUpFirstStep,
  signUpSecondStep,
};
