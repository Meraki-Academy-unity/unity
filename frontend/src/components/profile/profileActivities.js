import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import moment from "moment";

const ProfileActivities = ({ setIsHome }) => {
  const [activitiesProf, setActivitiesProf] = useState([]);
  const history = useHistory();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
  // setIsHome(false)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/activities/myProfile`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setActivitiesProf(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="profile_post_page">
        {activitiesProf &&
          activitiesProf.map((elem, index) => {
            return (
              <div key={index} className="post_card">
                <div>
                  <img
                    className="poster_image"
                    src={elem.images}
                    onClick={() => {
                      history.push(`/activities/activity/${elem.id}`);
                    }}
                  />
                </div>
                <div className="profile_post_details">
                  {/* <div className="uploader">
                    <img src={elem.profile_image} className="img"></img>
                    <p style={{ color: "black" }}>
                      {elem.first_name} {elem.last_name}
                    </p>
                  </div> */}
                  <div
                    className="post_info"
                    onClick={() => {
                      history.push(`/activities/activity/${elem.id}`);
                    }}
                  >
                    <h2
                      style={{ color: "rgb(232,180,48)", fontWeight: "bold" }}
                    >
                      {elem.title}
                    </h2>
                    <p className="text">activity location : {elem.location}</p>
                    <p className="text">activities to do :{elem.activities}</p>
                    <p className="text">
                      Start date :{" "}
                      {moment(elem.start_date, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("DD-MM-YYYY")}
                    </p>
                    <p className="text">
                      Finish date :{" "}
                      {moment(elem.finish_date, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("DD-MM-YYYY")}
                    </p>
                    <p className="text">
                      estimated budget : {elem.estimated_budget} $
                    </p>
                    <br />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProfileActivities;
