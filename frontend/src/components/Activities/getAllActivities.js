import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Route } from "react-router-dom";

const Activities = () => {
  const [activities, setactivities] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/activities/`)
      .then((result) => {
        setactivities(result.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <>
      <br />
      <h1>Activities</h1>
      <br />
      {activities &&
        activities.map((res, ind) => {
          return (
            <Link to={`/activities/activity/${res.id}`} key={ind}>
              {" "}
              <div>
                <p>
                  {res.first_name} {res.last_name}
                </p>
                <h2>{res.title}</h2>
                <p>{res.activities}</p>
                <p>{res.location}</p>
                <p>{res.creation_time}</p>
                <br />
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default Activities;
