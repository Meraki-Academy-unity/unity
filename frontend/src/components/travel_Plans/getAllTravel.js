import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from 'react-icons/fa';
import {IconContext} from "react-icons"
import moment from 'moment';

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
        <div className = "add">


        <button
        style = {{ backgroundColor:"white" , border:"none"}}
          onClick={() => {
            history.push("/addTravel");
          }}
        >
          <IconContext.Provider value={{ style: {fontSize: '35px', color: "rgb(0, 123, 255)"}}}>
             <FaPlus />
            </IconContext.Provider>
        </button>
        </div>
      ) : (
        ""
      )}
    <div className="Plans">
    {travels &&
      travels.map((res, ind) => {
        return (
          
            <div className="Plan">
              <div className="leftPlan">
              <img src={res.profile_image} className="img"></img>
              <p style = {{color: "rgb(0, 123, 255)", marginLeft: "10px"}}>
                {res.first_name} {res.last_name}
              </p>
              </div>


              <div className="rightPlan" onClick = {()=>{
                    history.push(`travelPlans/${res.id}`)
                  }}>
              <h2 style ={{ color: "rgb(232,180,48)", fontWeight: "bold" }}>{res.title}</h2>
              <p className="p">countries : {res.countries}</p>
              <p className="p">start date : {moment(res.start_date, "YYYY-MM-DD").add(1, 'days').format("DD-MM-YYYY")}</p>
              <p className="p">finish date : {moment(res.finish_date, "YYYY-MM-DD").add(1, 'days').format("DD-MM-YYYY")}</p>
              <div style={{display:"flex", gap:"116px" }}>
              <p className="p">estimated budget : {res.estimated_budget}</p>
              <button className="btn" onClick = {()=>{
                    history.push(`/${res.id}`)
                  }}>Join Now</button>
              </div>
            </div>
            
          </div>
        );
      })}
      </div>
  </>
  )
};

export default GetAllTravel;
