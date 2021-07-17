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
import img from "../chat/notFound.png";

const Activities = ({ setIsHome }) => {
  const [activities, setactivities] = useState("");
  setIsHome(false);

  const [visitorActivities, setVisitorActivities] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id,
    };
  });

  const UserData = () => {
    useEffect(() => {
      axios
        .get(`/activities/`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((result) => {
          if (result.data.length) {
            const arr = [];
            let date = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
            result.data.map((elem, i) => {
              let startDate = moment(elem.start_date, "YYYY-MM-DD").format(
                "YYYY-MM-DD"
              );
              let compare = moment(startDate).isAfter(date, "days");
              if (compare) {
                arr.push(elem);
              }
            });
            const sortedArray = arr.sort(
              (a, b) =>
                new moment(a.start_date).format("YYYYMMDD") -
                new moment(b.start_date).format("YYYYMMDD")
            );
            setactivities(sortedArray);
          } else {
            setactivities(result.data);
          }
        })
        .catch((err) => {
          throw err;
        });
    }, []);
  };

  const VisitorData = () => {
    useEffect(() => {
      axios
        .get(`/activities/visitor`)

        .then((result) => {
          if (result.data.length) {
            const arr = [];
            let date = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
            result.data.map((elem, i) => {
              let startDate = moment(elem.start_date, "YYYY-MM-DD").format(
                "YYYY-MM-DD"
              );
              let compare = moment(startDate).isAfter(date, "days");
              if (compare) {
                arr.push(elem);
              }
            });
            const sortedArray = arr.sort(
              (a, b) =>
                new moment(a.start_date).format("YYYYMMDD") -
                new moment(b.start_date).format("YYYYMMDD")
            );
            setVisitorActivities(sortedArray);
          } else {
            setVisitorActivities(result.data);
          }
        })
        .catch((err) => {
          throw err;
        });
    }, []);
  };

  return (
    <>
      <div className="content">
        {state.token ? (
          <>
            {UserData()}
            <button
              style={{ marginLeft: "95%", marginTop: "100px" }}
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

            {!activities.length ? (
              <div className="notFound">
                {" "}
                <img width="500px" src={img} />
                <p>No Activities to show</p>{" "}
              </div>
            ) : (
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
                              history.push(
                                `/activities/activity/${element.id}`
                              );
                            }}
                          />
                        </div>
                        <div className="post_details">
                          <div className="uploader">
                            <img
                              src={element.profile_image}
                              className="img"
                            ></img>

                            {state.id != element.user_id ? (
                              <Link
                                className="link"
                                to={`/users/user/${element.user_id}`}
                              >
                                <p style={{ color: "black" }}>
                                  {element.first_name} {element.last_name}
                                </p>
                              </Link>
                            ) : (
                              <Link className="link" to={`/profile`}>
                                <p style={{ color: "black" }}>
                                  {element.first_name} {element.last_name}
                                </p>
                              </Link>
                            )}
                          </div>

                          <div
                            className="post_info"
                            onClick={() => {
                              history.push(
                                `/activities/activity/${element.id}`
                              );
                            }}
                          >
                            <h2
                              style={{
                                color: "rgb(232,180,48)",
                                fontWeight: "bold",
                              }}
                            >
                              {element.title}
                            </h2>
                            <p className="text">
                              location : {element.location}
                            </p>
                            <p className="text">
                              start date :{" "}
                              {moment(element.start_date, "YYYY-MM-DD")
                                .add(1, "days")
                                .format("DD-MM-YYYY")}
                            </p>
                            <p className="text">
                              finish date :{" "}
                              {moment(element.finish_date, "YYYY-MM-DD")
                                .add(1, "days")
                                .format("DD-MM-YYYY")}
                            </p>
                            <div style={{ display: "flex", gap: "116px" }}>
                              <p className="text">
                                estimated budget : {element.estimated_budget} $
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </>
        ) : (
          <>
            {VisitorData()}
            {!visitorActivities.length ? (
              <div className="notFound">
                {" "}
                <img width="500px" src={img} />
                <p>No Activities to show</p>{" "}
              </div>
            ) : (
              <div className="post_page">
                {visitorActivities &&
                  visitorActivities.map((element, index) => {
                    return (
                      <div key={index} className="post_card">
                        <div>
                          <img
                            className="poster_image"
                            src={element.images}
                            onClick={() => {
                              history.push(
                                `/activities/activity/${element.id}`
                              );
                            }}
                          />
                        </div>
                        <div className="post_details">
                          <div className="uploader">
                            <img
                              src={element.profile_image}
                              className="img"
                            ></img>

                            
                              <Link
                                className="link"
                                to={`/users/user/${element.user_id}`}
                              >
                                <p style={{ color: "black" }}>
                                  {element.first_name} {element.last_name}
                                </p>
                              </Link>
                            
                          </div>

                          <div
                            className="post_info"
                            onClick={() => {
                              history.push(
                                `/activities/activity/${element.id}`
                              );
                            }}
                          >
                            <h2
                              style={{
                                color: "rgb(232,180,48)",
                                fontWeight: "bold",
                              }}
                            >
                              {element.title}
                            </h2>
                            <p className="text">
                              location : {element.location}
                            </p>
                            <p className="text">
                              start date :{" "}
                              {moment(element.start_date, "YYYY-MM-DD")
                                .add(1, "days")
                                .format("DD-MM-YYYY")}
                            </p>
                            <p className="text">
                              finish date :{" "}
                              {moment(element.finish_date, "YYYY-MM-DD")
                                .add(1, "days")
                                .format("DD-MM-YYYY")}
                            </p>
                            <div style={{ display: "flex", gap: "116px" }}>
                              <p className="text">
                                estimated budget : {element.estimated_budget} $
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Activities;
