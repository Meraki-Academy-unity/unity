import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import AddTravelComment from "./addComment";
import moment from "moment";
import CheckTravelJoin from "./checkJoin";
import "./../Activities/style.css";

const GetTravelById = (id) => {
  const [travel, setTravel] = useState("");

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
        setTravel(result.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <div>
        <div className="post_activity_details">
          <div className="post_content">
            <div className="post_activity_Img">
              <img src={travel.images} className="post_activity_Img"></img>
            </div>
            <h1 className="title">{travel.title}</h1>
            <p className="text">Location: {travel.location}</p>
            <p className="text">
              Start date:{" "}
              {moment(travel.start_date, "YYYY-MM-DD")
                .add(1, "days")
                .format("DD-MM-YYYY")}
            </p>
            <p className="text">
              Finish date:{" "}
              {moment(travel.finish_date, "YYYY-MM-DD")
                .add(1, "days")
                .format("DD-MM-YYYY")}
            </p>
            <p className="text">Details : {travel.details}</p>
            <p className="text">Requirements: {travel.requirements}</p>
            <p className="text">Activities: {travel.activities}</p>
            <p className="text">Estimated budget: {travel.estimated_budget}</p>
            <p className="text">
              Created by :{" "}
              {state.id !== travel.user_id ? (
                <Link className="link" to={`/users/user/${travel.user_id}`}>
                  {travel.first_name} {travel.last_name}
                </Link>
              ) : (
                <Link className="link" to={`/profile`}>
                  {travel.first_name} {travel.last_name}
                </Link>
              )}
            </p>
            {state.token ? <CheckTravelJoin travel_id={travel.id} /> : ""}
            {state.token ? <AddTravelComment travel_id={travel.id} /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetTravelById;
