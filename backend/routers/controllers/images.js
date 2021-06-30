const db = require("../../db/db");

const addImage = (req, res) => {
    const user_id = req.token.user_id;
    const {images}=req.body,
    const query = `INSERT INTO images (user_id,images) VALUES (?,?)`;
    const data = [user_id, images];
    cdb.query(query, data, (err, result) => {
        if (result) res.status(200).json(result);
        else res.status(400).json("ERROR !");
    });
};


module.exports = {
    addImage
}