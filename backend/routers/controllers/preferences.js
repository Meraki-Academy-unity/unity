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
    else {
      console.log(err)
      res.status(400).json("ERROR OCCURRED !")
    };
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

const updatePreferenceById = (req, res) => {
  const {
    location,
    start_date,
    finish_date,
    activities,
    similar_age,
    same_gender,
    preference_id,
  } = req.body;
  const query = `UPDATE preferences SET location=?,start_date=?,finish_date=?,activities=?,similar_age=?,same_gender=? WHERE id = ?`;
  const data = [
    location,
    start_date,
    finish_date,
    activities,
    similar_age,
    same_gender,
    preference_id,
  ];

  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json("Preference Updated Successfully!");
    else res.status(400).json("ERROR OCCURRED !");
  });
};

const matchByLocation = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT * FROM preferences WHERE user_id = ?`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (result) {
      // res.status(200).json("Preference Updated Successfully!");
      const query1 = "SELECT  users.first_name ,users.last_name ,users.id,users.profile_image,users.birth_date ,preferences.location ,preferences.activities FROM preferences INNER JOIN users ON user_id = users.id WHERE location =? AND NOT users.id=?"
      const data1 = [result[0].location, user_id]
      connection.query(query1, data1, (err, result_1) => {
        if (result_1) res.status(200).json(result_1);
        else res.status(400).json("ERROR OCCURRED !");
      });
    }
    else res.status(400).json("ERROR OCCURRED !");
  });


}

module.exports = {
  addPreference,
  deletePreference,
  showPreferenceById,
  updatePreferenceById,
  matchByLocation
};
