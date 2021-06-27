const db = require("../../db/db")


const addActivity = (req, res) => {
    const id = req.params.id;
    const query = `INSERT INTO activities (title, start_date, finish_date ,location, details, requirements , activities ,  images , estimated_budget) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)  `;
    const { title, start_date, finish_date, location, details, requirements, activities, images, estimated_budget } = req.body
    const data = [title, start_date, finish_date, location, details, requirements, activities, images, estimated_budget, id];
    db.query(query, data, (err, results) => {
        if (err) throw err;
        res.status(201).json(results)
        //res.json("added complete")
    });
};
const getAllActivities = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM  activities INNER JOIN  users ON  users.currently_in=activities.location AND users.id=?';
    data = [id]
    db.query(query, data, (err, result) => {
        if (err) throw err;
        console.log('RESULT: ', result);
        res.json(result)
    });
};

const getActivitiesById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM  activities INNER JOIN  users ON activities.id=? WHERE users.id=user_id';
    data = [id]
    db.query(query, data, (err, result) => {
        if (err) throw err;
        console.log('RESULT: ', result);
        res.json(result)
    });
};

const deleteActivitiesById = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM  activities WHERE id=?';
    data = [id]
    db.query(query, data, (err, result) => {
        if (err) throw err;
        console.log('RESULT: ', result);
        res.json(result)
    });
};

const updateActivitiesById = (req, res) => {
    const id = req.params.id;
    const query = 'UPDATE activities SET title=?, start_date=?, finish_date=? ,location=?, details=?, requirements=? , activities=? ,  images=? , estimated_budget=?   WHERE  id=?';
    data = [title, start_date, finish_date, location, details, requirements, activities, images, estimated_budget, id];
    db.query(query, data, (err, result) => {
        if (err) throw err;
        console.log('RESULT: ', result);
        res.json(result)
    });
}




module.exports = {
    addActivity,
    getAllActivities,
    getActivitiesById,
    deleteActivitiesById,
    updateActivitiesById
};