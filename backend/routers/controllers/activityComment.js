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


module.exports = {
    addActivityComment
};
