const db = require("../../db/db");

/*
    title VARCHAR(255)  NOT NULL,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    details VARCHAR(255), 
    requirements VARCHAR(255) ,
    activities VARCHAR(255) ,
    images VARCHAR(255) ,
    estimated_budget INT,
    status_id INT ,
    user_id INT,
    creation_time  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id ) REFERENCES users(id ),
    FOREIGN KEY (status_id) REFERENCES status(id),
*/

const addActivity = (req, res) => {
  const id = req.params.id;
  const query_ = `SELECT currently_in FROM  users WHERE id=${id}`;
  db.query(query_, (err, results) => {
    if (err) throw err;
    const currentlyIn = results[0].currently_in;
    const query = `INSERT INTO activities (title, start_date, finish_date ,location, details, requirements , activities ,  images , estimated_budget,user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)  `;
    const {
      title,
      start_date,
      finish_date,
      details,
      requirements,
      activities,
      images,
      estimated_budget,
    } = req.body;

    const data = [
      title,
      start_date,
      finish_date,
      currentlyIn,
      details,
      requirements,
      activities,
      images,
      estimated_budget,
      id,
    ];
    db.query(query, data, (err, results) => {
      if (err) throw err;
      res.status(201).json(results);
      //res.json("added complete")
    });
  });
};
const getAllActivities = (req, res) => {
  const id = req.params.id;
  const query =
    "SELECT * FROM  activities INNER JOIN  users ON  users.currently_in=activities.location AND users.id=?";
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};

const getActivitiesById = (req, res) => {
  const id = req.params.id;
  const query =
    "SELECT * FROM  activities INNER JOIN  users ON activities.id=? WHERE users.id=user_id";
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};

const deleteActivitiesById = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM  activities WHERE id=?";
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};

const updateActivitiesById = (req, res) => {
  const id = req.params.id;
  const {
    title,
    start_date,
    finish_date,
    location,
    details,
    requirements,
    activities,
    images,
    estimated_budget,
  } = req.body;
  const query =
    "UPDATE activities SET title=?, start_date=?,finish_date=? ,location=?, details=?, requirements=? , activities=? , images=? , estimated_budget=?   WHERE  id=?";
  let data = [
    title,
    start_date,
    finish_date,
    location,
    details,
    requirements,
    activities,
    images,
    estimated_budget,
    id,
  ];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};

const joinActivityById = (req, res) => {
  const activity_id = req.params.id;
  const user_id = req.body.user_id;
  const query = `INSERT INTO activity_members (user_id,activity_id) VALUES (?,?)`;
  const data = [user_id, activity_id];

  db.query(query, data, (err, result) => {
    if (result) res.status(200).json("Activity Joined Successfully !");
    else res.status(400).json("ERROR OCCURRED.. !");
  });
};

module.exports = {
  addActivity,
  getAllActivities,
  getActivitiesById,
  deleteActivitiesById,
  updateActivitiesById,
  joinActivityById,
};
