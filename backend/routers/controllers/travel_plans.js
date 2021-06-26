const db = require("../../db")



const createTravelPlane = (req,res) => {
    const query = `INSERT INTO travel_plans (title, start_date, finish_date , countries , activities , requirements , details , images , estimated_budget) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?)`;
    const {title , start_date , finish_date , countries , activities , requirements , details , images , estimated_budget} = req.body
    const data = [title , start_date , finish_date , countries, activities , requirements , details , images , estimated_budget];
    db.query(query, data, (err, results) => {
      if(err) throw err ;
      res.status(201)
      res.json("added complete")
    });
  };





module.exports = {
  createTravelPlane,
};