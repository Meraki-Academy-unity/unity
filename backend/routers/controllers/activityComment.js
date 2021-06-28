const db = require("../../db/db");

const addActivityComment = (req, res) => {
    const { content } = req.body;
    const query = `INSERT INTO activity_comments (content) VALUES (?)`;
    const data = [content];
    db.query(query, data, (err, result) => {
        if (result) res.status(200).json(result);
        else res.status(400).json("ERROR !");
    })
}

const showAllCommentByActivityId = (req, res) => {
    const id = req.params.id;
    console.log("id",id)
    const query = "SELECT * FROM  activity_comments INNER JOIN activities ON activity_id=activities.id AND activity_id=?";
    const data = [id];
    db.query(query, data, (err, result) => {
        if (err) throw err;
        console.log("RESULT: ", result);
        res.json(result);
    });
}


module.exports = {
    addActivityComment,
    showAllCommentByActivityId
};
