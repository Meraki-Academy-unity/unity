import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import AddComment from "./addComment";


import { useSelector } from "react-redux";
import Join from "./activityJoin";
import CheckJoin from "./checkJoin";
import moment from "moment";

const GetActivityById = (id) => {
  
  const [activity, setActivity] = useState([]);
  
  
  const history = useHistory()
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000${id.location.pathname}`)
      .then((result) => {
        setActivity(result.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  }, []);





  return (
    <>
      <div style={{marginTop:"85px"}}>
        <div className="post">
          <div className = "postCont">
          <img src={activity.images} className="postImg"></img>
          <h1>{activity.title}</h1>
          <p className="text">location: {activity.location}</p>
          <p className="text">start date: {moment(activity.start_date, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("DD-MM-YYYY")}</p>
          <p className="text" >finish date: {moment(activity.finish_date, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("DD-MM-YYYY")}</p>
          <p className="text">details : {activity.details}</p>
          <p className="text">requirements: {activity.requirements}</p>
          <p className="text">activities: {activity.activities}</p>
          <p className="text">estimated budget: {activity.estimated_budget}</p>
          <p className="text">
            created by :{" "}
            {state.id !== activity.user_id ? (<Link to={`/users/user/${activity.user_id}`}>
              {activity.first_name} {activity.last_name}
            </Link>) : (<Link to={`/profile`}>
              {activity.first_name} {activity.last_name}
            </Link>)}
          </p>
          </div>
        
        {state.token ? <CheckJoin activity_id={activity.id} /> : ""}
        
        {state.token ? <AddComment activity_id={activity.id} /> : ""}
      </div>
      </div>
    </>
  );
};

export default GetActivityById;
