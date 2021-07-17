import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Join = ({ activity_id }) => {
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  const addMember = () => {
    axios
      .post(
        `/activities/activity/${activity_id}`,
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
  return <>{addMember}</>;
};

export default Join;
