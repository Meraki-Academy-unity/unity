const db = require("../../db/db");

const addActivityComment = (req, res) => {
    const activity_id = req.params.id;
    const { content,user_id, } = req.body;
    const query = `INSERT INTO activity_comments (content,user_id,activity_id) VALUES (?,?,?)`;
    const data = [content,user_id,activity_id];
    db.query(query, data, (err, result) => {
        if (result) res.status(200).json("Comment Added Successfully..!");
        else res.status(400).json("ERROR OCCURRED..!");
    })
}

const showAllCommentByActivityId = (req, res) => {
    const activity_id = req.params.id;
    const query = "SELECT * FROM  activity_comments INNER JOIN activities ON activity_id=activities.id AND activity_id=?";
    const data = [activity_id];
    db.query(query, data, (err, result) => {
        if (err) res.status(400).json("ERROR OCCURRED..!");
        else res.status(200).json(result);
    });
}


module.exports = {
    addActivityComment,
    showAllCommentByActivityId
};
