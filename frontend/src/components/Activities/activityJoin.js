import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const Join = ({ activity_id }) => {
  const [join, setJoin] = useState(false);
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  
  const addMember = () => {
    axios
      .post(
        `http://localhost:5000/activities/activity/${activity_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    {addMember}
    </>
  );
};

export default Join;
