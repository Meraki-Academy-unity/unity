const db = require("../../db/db")


const createActivity =(req,res) => {
    const query = `INSERT INTO activities (title, start_date, finish_date ,location, details, requirements , activities ,  images , estimated_budget) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
    const {title, start_date, finish_date ,location, details, requirements , activities ,  images , estimated_budget} = req.body
    const data = [title, start_date, finish_date ,location, details, requirements , activities ,  images , estimated_budget];
    db.query(query, data, (err, results) => {
      if(err) throw err ;
      res.status(201).json(results)
     // res.json("added complete")
    });
  };




module.exports = {
    createActivity,
};