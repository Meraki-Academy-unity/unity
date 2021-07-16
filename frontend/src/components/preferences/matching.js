import React, { useEffect, useState } from "react";
import { useHistory, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import "./matching.css";

const Matching = () => {
  const [stateMatch, setStateMatch] = useState("both");
  const [content, setContent] = useState([]);

  const history = useHistory();

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token,
    };
  });
  const MatchByLoaction = () => {
    useEffect(() => {
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
    }, [stateMatch]);
  };

  const MatchByDate = () => {
    useEffect(() => {
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
    }, [stateMatch]);
  };

  const MatchByDateAndLocation = () => {
    useEffect(() => {
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
    }, [stateMatch]);
  };

  return (
    <>
      <div className="matchingPage">
        <button
          className="interactionButton"
          onClick={() => {
            setStateMatch("both");
          }}
        >
          {" "}
          Matching
        </button>
        <button
          className="interactionButton"
          onClick={() => {
            setStateMatch("location");
          }}
        >
          {" "}
          Match By location
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

        {stateMatch == "location" ? <>{MatchByLoaction()}</> : ""}
        {stateMatch == "date" ? <>{MatchByDate()}</> : ""}
        {stateMatch == "both" ? <>{MatchByDateAndLocation()}</> : ""}

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
                  <div>
                    <button className="interactionButton">
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
                    {moment(elem.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")}{" "}
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
      </div>
    </>
  );
};
export default Matching;
