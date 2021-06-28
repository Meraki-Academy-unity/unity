const db = require("../../db/db");

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
    const query = "SELECT * FROM  activity_comments INNER JOIN activities ON activity_id=activities.id AND activity_id=?";
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


module.exports = {
    addActivityComment,
    showAllCommentByActivityId,
    updateActivitiesComment,
    deletActivitiesComment
};
