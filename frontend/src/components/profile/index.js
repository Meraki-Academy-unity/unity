import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  useEffect(getProfile, []);

  function getProfile() {
    axios
      .get("http://localhost:5000/users/myProfile", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setProfile(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.warn("After Getting profile: ", profile);

  return (
    <div>
      <div>
        {profile &&
          profile.map((element, i) => {
            return (
              <div key={i}>
                <div>{element.first_name + "_" + element.last_name}</div>
                <div>{element.email}</div>
                <div>{element.profile_image}</div>
                <div>{element.birth_date}</div>
                <div>{element.region}</div>
                <div>{element.gender}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
