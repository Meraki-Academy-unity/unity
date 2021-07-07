const db = require("../../db/db");

const addActivity = (req, res) => {
  const id = req.token.user_id;
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
  const user_id = req.token.user_id;
  const query_ = `SELECT currently_in FROM  users WHERE id=${user_id}`;
  db.query(query_, (err, results) => {
    if (err) throw err;
    if (results) {
      const currentlyIn = results[0].currently_in;
      const query1 = `SELECT activities.title , activities.activities ,activities.id  , activities.location, activities.creation_time, activities.estimated_budget, activities.start_date , activities.finish_date , users.first_name , users.last_name , users.profile_image FROM activities INNER JOIN  users ON activities.user_id = users.id WHERE activities.location=?`;
      const data = [currentlyIn];
      db.query(query1, data, (err, results_) => {
        if (err) throw err;
        res.status(200);
        res.json(results_);
      });
    }
  });

}

const getMyActivities = (req, res) => {
  const user_id = req.token.user_id;
  const query =
    "SELECT activities.title , activities.activities ,activities.id , activities.location, activities.creation_time, activities.estimated_budget, activities.start_date , activities.finish_date , activities.details  , activities.requirements , activities.images , users.first_name , users.last_name, users.profile_image , activities.user_id FROM  activities INNER JOIN  users  ON users.id= activities.user_id WHERE  activities.user_id=?";
  ;
  const data = [user_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}

const getAllActivitiesByUser = (req, res) => {
  const id = req.params.id;
  const query =
    "SELECT activities.title , activities.activities ,activities.id , activities.location, activities.creation_time, activities.estimated_budget, activities.start_date , activities.finish_date , activities.details  , activities.requirements , activities.images , users.first_name , users.last_name, users.profile_image , activities.user_id FROM  activities INNER JOIN  users ON users.id= activities.user_id WHERE users.id=?";
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const getActivitiesById = (req, res) => {

  const query = `SELECT activities.title , activities.activities ,activities.id  , activities.location, activities.creation_time
  , activities.estimated_budget, activities.start_date , activities.finish_date , activities.details 
  , activities.requirements , activities.images , users.first_name , users.last_name
  , users.profile_image , activities.user_id
  FROM activities INNER JOIN  users 
  ON activities.user_id = users.id  
  WHERE activities.id=?`;
  const data = [req.params.id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const deleteActivitiesById = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM  activities WHERE id=?";
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
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
    res.json(result);
  });
};

const joinActivityById = (req, res) => {
  const activity_id = req.params.id;
  const user_id = req.token.user_id;
  const query = `INSERT INTO activity_members (user_id,activity_id) VALUES (?,?)`;
  const data = [user_id, activity_id];

  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const addActivityComment = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const { content } = req.body;
  const query = `INSERT INTO  activity_comments (user_id,
        activity_id,content) VALUES (?,?,?)`;
  const data = [user_id, id, content];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR !");
  });
};

const showAllCommentByActivityId = (req, res) => {
  const id = req.params.id;
  const query =
    "SELECT content , activity_comments.user_id , users.first_name , users.last_name , users.profile_image,activity_comments.id FROM  activity_comments INNER JOIN activities ON activity_id=activities.id INNER JOIN users ON users.id = activity_comments.user_id  WHERE activity_id=? ";
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const updateActivitiesComment = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const { content } = req.body;
  const query =
    "UPDATE activity_comments SET content=? WHERE id=? AND user_id=?";
  const data = [content, id, user_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const deletActivitiesComment = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const query = "DELETE FROM  activity_comments WHERE id=? AND user_id=?";
  const data = [id, user_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const withDrawActivityById = (req, res) => {
  const activity_id = req.params.id;
  const user_id = req.token.user_id;
  const query = `DELETE FROM activity_members WHERE user_id = ? AND activity_id = ?`;
  const data = [user_id, activity_id];

  db.query(query, data, (err, result) => {
    if (result) res.status(200).json("Activity withDraw  Successfully !");
    else res.status(400).json("ERROR OCCURRED.. !");
  });
};

const getMember = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const query =
    "SELECT * FROM  activity_members  WHERE activity_id=? AND user_id=? ";
  const data = [id, user_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const getMembers = (req, res) => {
  const id = req.params.id
  const query = `SELECT users.first_name , users.last_name , users.profile_image , users.id FROM activity_members INNER JOIN users ON user_id = users.id WHERE activity_id = ? ;`;
  const data = [id]
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}



module.exports = {
  addActivity,
  getAllActivities,
  getAllActivitiesByUser,
  getActivitiesById,
  deleteActivitiesById,
  updateActivitiesById,
  joinActivityById,
  addActivityComment,
  showAllCommentByActivityId,
  updateActivitiesComment,
  deletActivitiesComment,
  withDrawActivityById,
  getMember,
  getMembers,
  getMyActivities
};
