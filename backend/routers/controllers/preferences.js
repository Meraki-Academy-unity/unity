const connection = require("../../db/db");
const moment = require("moment");

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
      console.log(err);
      res.status(400).json("ERROR OCCURRED !");
    }
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
  const id = req.params.id;
  const query = `SELECT * FROM preferences WHERE user_id = ? `;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR OCCURRED !");
  });
};

const showPreferenceByUser = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT * FROM preferences WHERE user_id = ? `;
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
      const query1 =
        "SELECT  users.first_name ,users.last_name ,users.id,users.profile_image,users.birth_date ,preferences.location ,preferences.activities, preferences.start_date,preferences.finish_date FROM preferences INNER JOIN users ON user_id = users.id WHERE location =? AND NOT users.id=?";
      const data1 = [result[0].location, user_id];
      connection.query(query1, data1, (err, result_1) => {
        if (result_1) res.status(200).json(result_1);
        else res.status(400).json("ERROR OCCURRED !");
      });
    } else res.status(400).json("ERROR OCCURRED !");
  });
};

const matchByDate = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT * FROM preferences WHERE user_id = ?`;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (result) {
      const date1 = moment(result[0].start_date, "YYYY-MM-DD");
      const date2 = moment(result[0].finish_date, "YYYY-MM-DD");
      const query1 =
        `SELECT  users.first_name ,users.last_name ,users.id,users.profile_image,users.birth_date ,preferences.location ,preferences.activities , preferences.start_date , preferences.finish_date FROM preferences INNER JOIN users ON user_id = users.id WHERE  NOT users.id=?`;
      const data1 = [user_id];
      connection.query(query1, data1, (err, result_1) => {
        if (result_1) {
          const arr = []
          result_1.filter((elem, i) => {
            if (date1.get('year') <= moment(elem.start_date, "YYYY-MM-DD").get('year') && date2.get('year') >= moment(elem.finish_date, "YYYY-MM-DD").get('year')) {
              if (date1.get('month') <= moment(elem.start_date, "YYYY-MM-DD").get('month') && date2.get('month') >= moment(elem.finish_date, "YYYY-MM-DD").get('month')) {
                return arr.push(elem)
              }
            }
          })
          res.status(200).json(arr);
        }
        else res.status(400).json(err);
      });
    } else res.status(400).json("ERROR OCCURRED !");
  });
};

const matching = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT * FROM preferences WHERE user_id = ?`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (result) {
      // res.status(200).json("Preference Updated Successfully!");
      const date1 = moment(result[0].start_date, "YYYY-MM-DD");
      const date2 = moment(result[0].finish_date, "YYYY-MM-DD");
      const query1 =
        "SELECT  users.first_name ,users.last_name ,users.id,users.profile_image,users.birth_date ,preferences.location ,preferences.activities, preferences.start_date,preferences.finish_date FROM preferences INNER JOIN users ON user_id = users.id WHERE location =? AND NOT users.id=?";
      const data1 = [result[0].location, user_id];
      connection.query(query1, data1, (err, result_1) => {
        if (result_1) {
          const arr = []
          result_1.filter((elem, i) => {
            if (date1.get('year') <= moment(elem.start_date, "YYYY-MM-DD").get('year') && date2.get('year') >= moment(elem.finish_date, "YYYY-MM-DD").get('year')) {
              if (date1.get('month') <= moment(elem.start_date, "YYYY-MM-DD").get('month') && date2.get('month') >= moment(elem.finish_date, "YYYY-MM-DD").get('month')) {
                return arr.push(elem)
              }
            }
          })
          res.status(200).json(arr);
        }

        else res.status(400).json("ERROR OCCURRED !");
      });
    } else res.status(400).json("ERROR OCCURRED !");
  });

}
module.exports = {
  addPreference,
  deletePreference,
  showPreferenceById,
  updatePreferenceById,
  matchByLocation,
  matchByDate,
  matching,
  showPreferenceByUser
};
