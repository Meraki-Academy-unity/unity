import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { Link, Route } from "react-router-dom";
import "./../Activities/style.css";
import { useDispatch, useSelector } from "react-redux";

const GetMyPreferences = () => {
  const [preferences, setPreferences] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/preferences/user`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setPreferences(result.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <div className="pref_page">
        {preferences &&
          preferences.map((elem, i) => {
            return (
              <div key={i}>
                <p> Desired Travel Destinations : {elem.location}</p>
                <p>
                  Availability Date : from{" "}
                  {moment(elem.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")}{" "}
                  to{" "}
                  {moment(elem.finish_date, "YYYY-MM-DD").format("DD-MM-YYYY")}
                </p>
                <p>Activities to do: {elem.activities}</p>
                <p>Same Gender: {elem.same_gender ? "Yes" : "No"}</p>
                <p>Same Age: {elem.similar_age ? "Yes" : "No"}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default GetMyPreferences;
