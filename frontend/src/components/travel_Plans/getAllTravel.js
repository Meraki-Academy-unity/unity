import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import "./../Activities/style.css"
import { useDispatch, useSelector } from "react-redux";


const GetAllTravel = () => {
  const [travels, setTravels] = useState([]);
  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token
    };
  });
  const history = useHistory()
  useEffect(() => {
    axios
      .get(`http://localhost:5000/travelPlans`)
      .then((result) => {
        setTravels(result.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
    {state.token ? (
        <button
          onClick={() => {
            history.push("/addTravel");
          }}
        >
          Add Travel Plans
        </button>
      ) : (
        ""
      )}
    <div className="Activities">
    {travels &&
      travels.map((res, ind) => {
        return (
          
            <div className="Activity">
              <div className="leftAct">
              <img src={res.profile_image} className="img"></img>
              <p style = {{color:"blue" , marginLeft:"10px"}}>
                {res.first_name} {res.last_name}
              </p>
              </div>
              <Link to={`travelPlans/${res.id}`} key={ind}>
              <div className="rightAct">
              <h2 style ={{color: "#507fa4" , fontWeight:"bolder"}}>{res.title}</h2>
              <p className="p">countries : {res.countries}</p>
              <p className="p">activities to do :{res.activities}</p>
              <p className="p">start date : {res.start_date}</p>
              <p className="p">finish date : {res.finish_date}</p>
              <p className="p">estimated budget : {res.estimated_budget}</p>
              <br />
            </div>
            
          </Link>
          </div>
        );
      })}
      </div>
  </>
  )
};

export default GetAllTravel;
