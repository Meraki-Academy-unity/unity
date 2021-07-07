const db = require("../../db/db");

const createTravelPlans = (req, res) => {
  console.log("bayan naar ")
  const user_id = req.token.user_id;
  const query = `INSERT INTO travel_plans (title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget,user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?,?)`;
  const {
    title,
    start_date,
    finish_date,
    countries,
    activities,
    requirements,
    details,
    images,
    estimated_budget,
  } = req.body;
  const data = [
    title,
    start_date,
    finish_date,
    countries,
    activities,
    requirements,
    details,
    images,
    estimated_budget,
    user_id,
  ];
  db.query(query, data, (err, results) => {
    if (err) { console.log("err", err) };
    res.status(201);
    res.json("added complete");
  });
};

const getAllTravelPlans = (req, res) => {
  const query = `SELECT travel_plans.title , travel_plans.activities ,travel_plans.id , travel_plans.countries ,travel_plans.countries , travel_plans.creation_time , users.first_name , users.last_name  FROM travel_plans INNER JOIN  users ON travel_plans.user_id = users.id `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.status(200);
    res.json(results);
  });
};

const getTravelPlansById = (req, res) => {
  const query = `SELECT travel_plans.title , travel_plans.activities ,travel_plans.id  , travel_plans.countries, travel_plans.creation_time
  , travel_plans.estimated_budget, travel_plans.start_date , travel_plans.finish_date , travel_plans.details 
  , travel_plans.requirements , travel_plans.images , users.first_name , users.last_name
  , users.profile_image , travel_plans.user_id
  FROM travel_plans INNER JOIN  users 
  ON travel_plans.user_id = users.id  
  WHERE travel_plans.id=?`;
  const data = req.params.id;
  db.query(query, data, (err, results) => {
    if (err) throw err;
    res.status(200);
    res.json(results);
  });
};
const getTravelPlansByUser = (req, res) => {
  const query = `SELECT travel_plans.title , travel_plans.activities ,travel_plans.id  , travel_plans.countries, travel_plans.creation_time
  , travel_plans.estimated_budget, travel_plans.start_date , travel_plans.finish_date , travel_plans.details 
  , travel_plans.requirements , travel_plans.images , users.first_name , users.last_name
  , users.profile_image , travel_plans.user_id
  FROM travel_plans INNER JOIN  users 
  ON travel_plans.user_id = users.id  
  WHERE user_id=?`;
  const data = req.params.id;
  db.query(query, data, (err, results) => {
    if (err) throw err;
    res.status(200);
    res.json(results);
  });
};

const updateTravelPlansById = (req, res) => {
  const query = `UPDATE travel_plans SET title = ? , start_date = ? , finish_date = ? , countries = ? , activities = ? , requirements = ? , details = ? , images = ? , estimated_budget = ? WHERE id=?`;
  const {
    title,
    start_date,
    finish_date,
    countries,
    activities,
    requirements,
    details,
    images,
    estimated_budget,
  } = req.body;
  const data = [
    title,
    start_date,
    finish_date,
    countries,
    activities,
    requirements,
    details,
    images,
    estimated_budget,
    req.params.id,
  ];
  db.query(query, data, (err, results) => {
    if (err) throw err;
    res.status(202);
    res.json(results);
  });
};

const deleteTravelPlansById = (req, res) => {
  const query = `Delete FROM travel_plans  WHERE id=?`;
  const data = req.params.id;
  db.query(query, data, (err, results) => {
    if (err) throw err;
    res.status(202);
    res.json(results);
  });
};

const joinTravelPlanById = (req, res) => {
  const plan_id = req.params.id;
  const user_id = req.token.user_id;
  const query = `INSERT INTO plan_members (user_id,plan_id) VALUES (?,?)`;
  const data = [user_id, plan_id];

  db.query(query, data, (err, result) => {
    if (result) res.status(200).json("Travel Plans Joined Successfully !");
    else res.status(400).json("ERROR OCCURRED.. !");
  });
};

const withDrawTravelPlanById = (req, res) => {
  const plan_id = req.params.id;
  const user_id = req.token.user_id;
  const query = `DELETE FROM plan_members WHERE user_id = ? AND plan_id = ?`;
  const data = [user_id, plan_id];

  db.query(query, data, (err, result) => {
    if (result) res.status(200).json("Travel Plans Deleted Successfully !");
    else res.status(400).json("ERROR OCCURRED.. !");
  });
};

const addPlanComment = (req, res) => {
  const travel_plans_id = req.params.id;
  const user_id = req.token.user_id;
  const { content } = req.body;
  const query = `INSERT INTO travel_plans_comments (content,user_id,travel_plans_id) VALUES (?,?,?)`;
  const data = [content, user_id, travel_plans_id];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json("Comment Added Successfully..!");
    else res.status(400).json("ERROR OCCURRED..!");
  });
};

const showAllCommentByPlanId = (req, res) => {
  const travel_plans_id = req.params.id;
  const query =
    "SELECT content ,  travel_plans_comments.user_id , users.first_name , users.last_name , users.profile_image, travel_plans_comments.id FROM   travel_plans_comments INNER JOIN travel_plans ON  travel_plans_id=travel_plans.id INNER JOIN users ON users.id =  travel_plans_comments.user_id  WHERE  travel_plans_id=? ";
  const data = [travel_plans_id];
  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR OCCURRED..!");
  });
};

const showTravelPlanByCountry = (req, res) => {
  const country = req.params.country;
  const query = `SELECT * FROM travel_plans WHERE countries = ?`;
  const data = [country];

  db.query(query, data, (err, result) => {
    if (result) res.status(200).json(result);
    else res.status(400).json("ERROR OCCURRED..!");
  });
};

const updatePlanComment = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const { content } = req.body;
  const query =
    "UPDATE travel_plans_comments SET content=? WHERE id=? AND user_id=?";
  const data = [content, id, user_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const deletePlanComment = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const query = "DELETE FROM  travel_plans_comments WHERE id=? AND user_id=?";
  const data = [id, user_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const getMember = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const query =
    "SELECT * FROM  plan_members  WHERE  plan_id=? AND user_id=? ";
  const data = [id, user_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const getMembers = (req, res) => {
  const id = req.params.id
  const query = `SELECT users.first_name , users.last_name , users.profile_image , users.id FROM plan_members INNER JOIN users ON user_id = users.id WHERE plan_id = ? ;`;
  const data = [id]
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}
const getMyPlans = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT travel_plans.title , travel_plans.activities ,travel_plans.id  , travel_plans.countries, travel_plans.creation_time
  , travel_plans.estimated_budget, travel_plans.start_date , travel_plans.finish_date , travel_plans.details 
  , travel_plans.requirements , travel_plans.images , users.first_name , users.last_name
  , users.profile_image , travel_plans.user_id
  FROM travel_plans INNER JOIN  users 
  ON travel_plans.user_id = users.id  
  WHERE travel_plans.user_id=?`;
  const data = [user_id];
  db.query(query, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}

module.exports = {
  createTravelPlans,
  getAllTravelPlans,
  getTravelPlansById,
  updateTravelPlansById,
  deleteTravelPlansById,
  joinTravelPlanById,
  withDrawTravelPlanById,
  addPlanComment,
  showAllCommentByPlanId,
  showTravelPlanByCountry,
  updatePlanComment,
  deletePlanComment,
  getMember,
  getMembers,
  getMyPlans,
  getTravelPlansByUser

};
