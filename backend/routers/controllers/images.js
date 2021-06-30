const db = require("../../db/db");

const addImage = (req, res) => {
    const { images } = req.body;
    const user_id = req.token.user_id;
    const query = `INSERT INTO images (user_id,images) VALUES (?,?)`;
    const data = [user_id, images];
    db.query(query, data, (err, result) => {
        if (result) res.status(200).json(result);
        else res.status(400).json("ERROR !");
    });
};

const getImageByUserId = () => {
    const user_id = req.token.user_id;
    const query = "SELECT * FROM images INNER JOIN users ON user_id=images.id WHERE user_id=?"
    const data = [user_id];
    db.query(query, data, (err, result) => {
        if (result) res.status(200).json(result);
        else res.status(400).json("ERROR !");
    });
}

module.exports = {
    addImage,
    getImageByUserId
}