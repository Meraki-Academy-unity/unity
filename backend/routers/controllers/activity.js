const db = require("../../db/db");

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
    const query = `SELECT activities.title , activities.activities ,activities.id  , activities.location, activities.creation_time , users.first_name , users.last_name  FROM activities INNER JOIN  users ON activities.user_id = users.id `;
    db.query(query, (err, results) => {
      if (err) throw err;
      res.status(200);
      res.json(results);
    });
  };

const getAllActivitiesByUser = (req, res) => {
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
    const query =
    `SELECT * FROM activities WHERE id=?`;
    const data = req.params.id;
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

const addActivityComment = (req, res) => {
    const id = req.params.id;
    const { content, user_id } = req.body;
    const query = `INSERT INTO  activity_comments (user_id,
        activity_id,content) VALUES (?,?,?)`;
    const data = [user_id, id, content];
    db.query(query, data, (err, result) => {
        if (result) res.status(200).json(result);
        else res.status(400).json("ERROR !");
    })
}

const showAllCommentByActivityId = (req, res) => {
    const id = req.params.id;
    const query = "SELECT content , activity_comments.user_id  FROM  activity_comments INNER JOIN activities ON activity_id=activities.id WHERE activity_id=?";
    const data = [id];
    db.query(query, data, (err, result) => {
        if (err) throw err;
        console.log("RESULT: ", result);
        res.json(result);
    });
}

const updateActivitiesComment = (req, res) => {
    const id = req.params.id;
    const { content, user_id } = req.body;
    const query = "UPDATE activity_comments SET content=? WHERE id=? AND user_id=?";
    const data = [content, id, user_id]
    db.query(query, data, (err, result) => {
        if (err) throw err;
        console.log("RESULT: ", result);
        res.json(result);
    });
}

const deletActivitiesComment = (req, res) => {
    const id = req.params.id;
    const { user_id } = req.body;
    const query = "DELETE FROM  activity_comments WHERE id=? AND user_id=?";
    const data = [id, user_id]
    db.query(query, data, (err, result) => {
        if (err) throw err;
        console.log("RESULT: ", result);
        res.json(result);
    });
}

const withDrawActivityById = (req, res) => {
    const activity_id = req.params.id;
    const user_id = req.body.user_id;
    const query = `DELETE FROM activity_members WHERE user_id = ? AND activity_id = ?`;
    const data = [user_id, activity_id];
  
    db.query(query, data, (err, result) => {
      if (result) res.status(200).json("Activity withDraw  Successfully !");
      else res.status(400).json("ERROR OCCURRED.. !");
    });
  };



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
    withDrawActivityById
};
