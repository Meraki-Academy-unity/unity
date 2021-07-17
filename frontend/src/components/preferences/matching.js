import React, { useEffect, useState } from "react";
import { useHistory, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import "./matching.css";
import AddPerferences from "./addPreferences";

const Matching = () => {
  const [stateMatch, setStateMatch] = useState("");
  const [content, setContent] = useState([]);
  const [add, setAdd] = useState(false);
  const history = useHistory();

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token,
    };
  });

  const check = () => {
    setContent([]);
  };

  const CheckPreferences = () => {
    useEffect(() => {
      axios
        .get(`http://localhost:5000/preferences/user`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((result) => {
          if (result.data.length == 0) {
            setStateMatch("");
          } else {
            setStateMatch("both");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [stateMatch]);
  };

  const MatchByLoaction = () => {
    useEffect(() => {
      axios
        .get(`http://localhost:5000/preferences/user`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((result) => {
          if (result.data.length) {
            axios
              .get("http://localhost:5000/preferences/locationMatch", {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              })
              .then((result) => {
                setContent(result.data);
              })
              .catch((err) => {
                console.log("error", err);
              });
          } else {
            check();
          }
        })
        .catch((err) => {
          throw err;
        });
    }, [stateMatch]);
  };

  const MatchByDate = () => {
    useEffect(() => {
      axios
        .get(`http://localhost:5000/preferences/user`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((result) => {
          if (result.data.length) {
            axios
              .get("http://localhost:5000/preferences/dateMatch", {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              })
              .then((result) => {
                setContent(result.data);
              })
              .catch((err) => {
                console.log("error", err);
              });
          } else {
            check();
          }
        })
        .catch((err) => {
          throw err;
        });
    }, [stateMatch]);
  };

  const MatchByDateAndLocation = () => {
    useEffect(() => {
      axios
        .get(`http://localhost:5000/preferences/user`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((result) => {
          if (result.data.length) {
            axios
              .get("http://localhost:5000/preferences/match", {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              })
              .then((result) => {
                setContent(result.data);
              })
              .catch((err) => {
                console.log("error", err);
              });
          } else {
            check();
          }
        })
        .catch((err) => {
          throw err;
        });
    }, [stateMatch]);
  };

  return (
    <>
      {stateMatch == "" ? <>{CheckPreferences()}</> : ""}
      {stateMatch == "location" ? <>{MatchByLoaction()}</> : ""}
      {stateMatch == "date" ? <>{MatchByDate()}</> : ""}
      {stateMatch == "both" ? <>{MatchByDateAndLocation()}</> : ""}
      {content.length == 0 && stateMatch.length == 0 ? (
        <div className="matchingPage">
          {" "}
          <p>
            {" "}
            You dont have preferences please fill your preferences{" "}
            <button
              className="interactionButton"
              style={{ fontSize: "16px" }}
              onClick={() => {
                setAdd(true);
              }}
            >
              {" "}
              Click here
            </button>
          </p>
          {add ? <AddPerferences /> : ""}
        </div>
      ) : (
        <div className="matchingPage">
          <button
            className="interactionButton"
            onClick={() => {
              setStateMatch("both");
            }}
          >
            {" "}
            Match By Location & Date
          </button>
          <button
            className="interactionButton"
            onClick={() => {
              setStateMatch("location");
            }}
          >
            {" "}
            Match By Location
          </button>

          <button
            className="interactionButton"
            onClick={() => {
              setStateMatch("date");
            }}
          >
            {" "}
            Match By Date
          </button>

          {content.length == 0 ? (
            <div style={{ marginTop: "10px" }}>
              <p>No Matching found</p>
            </div>
          ) : (
            <>
              {content &&
                content.map((elem, i) => {
                  return (
                    <div className="matchBox" key={i}>
                      <div>
                        <div>
                          {" "}
                          <img src={elem.profile_image} />
                        </div>
                        <div className="UserName">
                          {elem.first_name} {elem.last_name}
                        </div>
                        {console.log("idddd", elem.user_id)}
                        <div>
                          <button
                            className="interactionButton"
                            onClick={() => {
                              history.push(`/chat/${elem.user_id}`);
                            }}
                          >
                            {" "}
                            Direct Message
                          </button>
                        </div>
                      </div>
                      {/* <Link to={`/users/user/${elem.id}`}> */}
                      <div>
                        <p
                          onClick={() => {
                            history.push(`/users/user/${elem.id}`);
                          }}
                        >
                          Matched User: {elem.first_name} {elem.last_name}
                        </p>
                        {/* </Link> */}

                        <p>
                          Availability Date : from{" "}
                          {moment(elem.start_date, "YYYY-MM-DD").format(
                            "DD-MM-YYYY"
                          )}{" "}
                          To{" "}
                          {moment(elem.finish_date, "YYYY-MM-DD").format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                        <p>Travel Destination: {elem.location}</p>
                        <p>Activities to do: {elem.activities}</p>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      )}
    </>
  );
};
export default Matching;
