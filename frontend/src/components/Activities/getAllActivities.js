import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import "./style.css";
import AddActivities from "./addActivities";
import { FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import moment from "moment";

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
      .get(`http://localhost:5000/activities/`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
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
      <div className="content">
        {state.token ? (
          <div className="add">
            <button
              style={{ backgroundColor: "rgb(241, 241, 241)", border: "none" }}
              onClick={() => {
                history.push("/addActivity");
              }}
            >
              <IconContext.Provider
                value={{
                  style: { fontSize: "35px", color: "rgb(232, 180, 48)" },
                }}
              >
                <FaPlus />
              </IconContext.Provider>
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="post_page">
          {activities &&
            activities.map((element, index) => {
              return (
                <div key={index} className="post_card">
                  <div>
                    <img
                      className="poster_image"
                      src={element.images}
                      onClick={() => {
                        history.push(`/activities/activity/${element.id}`);
                      }}
                    />
                  </div>
                  <div className="post_details">
                    <div className="uploader">
                      <img src={element.profile_image} className="img"></img>
                      <p style={{ color: "black" }}>
                        {element.first_name} {element.last_name}
                      </p>
                    </div>

                    <div
                      className="post_info"
                      onClick={() => {
                        history.push(`/activities/activity/${element.id}`);
                      }}
                    >
                      <h2
                        style={{ color: "rgb(232,180,48)", fontWeight: "bold" }}
                      >
                        {element.title}
                      </h2>
                      <p className="text">location : {element.location}</p>
                      <p className="text">
                        start date :{" "}
                        {moment(element.start_date, "YYYY-MM-DD")
                          .add(1, "days")
                          .format("DD-MM-YYYY")}
                      </p>
                      <p className="text">
                        finish date :{" "}
                        {moment(res.finish_date, "YYYY-MM-DD")
                          .add(1, "days")
                          .format("DD-MM-YYYY")}
                      </p>
                      <div style={{ display: "flex", gap: "116px" }}>
                        <p className="text">
                          estimated budget : {element.estimated_budget}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Activities;
