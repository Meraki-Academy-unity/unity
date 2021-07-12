import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import "./style.css";
import AddActivities from "./addActivities";
import { FaPlus } from 'react-icons/fa';
import {IconContext} from "react-icons"

const Activities = () => {
  const [activities, setactivities] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/activities/`,{
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      })
      .then((result) => {
        setactivities(result.data);
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
            history.push("/addActivity");
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
      <div className="Activities">
        {activities &&
          activities.map((res, ind) => {
            return (
              <div className="Activity">
                <div className="leftAct">
                  <img src={res.profile_image} className="img"></img>
                  <p style={{ color: "blue", marginLeft: "10px" }}>
                    {res.first_name} {res.last_name}
                  </p>
                </div>
                <Link to={`/activities/activity/${res.id}`} key={ind}>
                  <div className="rightAct">
                    <h2 style={{ color: "#507fa4", fontWeight: "bolder" }}>
                      {res.title}
                    </h2>
                    <p className="p">location : {res.location}</p>
                    <p className="p">activities to do :{res.activities}</p>
                    <p className="p">start date : {res.start_date}</p>
                    <p className="p">finish date : {res.finish_date}</p>
                    <p className="p">
                      estimated budget : {res.estimated_budget}
                    </p>
                    <br />
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Activities;
