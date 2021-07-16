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

  const history = useHistory();
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
      <div className="post_activity_details">
        <div className="post_content">
          <div className="post_activity_Img">
            <img src={activity.images}></img>
          </div>
          <h1 className="title">{activity.title}</h1>
          <p className="text">Location: {activity.location}</p>
          <p className="text">
            Start date:{" "}
            {moment(activity.start_date, "YYYY-MM-DD")
              .add(1, "days")
              .format("DD-MM-YYYY")}
          </p>
          <p className="text">
            Finish date:{" "}
            {moment(activity.finish_date, "YYYY-MM-DD")
              .add(1, "days")
              .format("DD-MM-YYYY")}
          </p>
          <p className="text">Details : {activity.details}</p>
          <p className="text">Requirements: {activity.requirements}</p>
          <p className="text">Activities: {activity.activities}</p>
          <p className="text">Estimated budget: {activity.estimated_budget}</p>
          <p className="text">
            Created by :{" "}
            {state.id != activity.user_id ? (
              <Link className="link" to={`/users/user/${activity.user_id}`}>
                {activity.first_name} {activity.last_name}
              </Link>
            ) : (
              <Link className="link" to={`/profile`}>
                {activity.first_name} {activity.last_name}
              </Link>
            )}
          </p>
          <div>
            {state.token ? <CheckJoin activity_id={activity.id} /> : ""}
            {state.token ? <AddComment activity_id={activity.id} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetActivityById;
