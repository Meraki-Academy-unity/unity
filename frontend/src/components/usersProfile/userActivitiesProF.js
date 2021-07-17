import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const ProfileUserActivities = () => {
  const [activitiesProf, setActivitiesProf] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/activities/all/user/${id}`)
      .then((result) => {
        setActivitiesProf(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {!activitiesProf.length ? (<div>
        {" "}
        <p>No Activities to show</p>{" "}
      </div>) :
        <div className="profile_post_page">
          {activitiesProf &&
            activitiesProf.map((element, index) => {
              return (
                <div className="post_card" key={index}>
                  <div>
                    <img
                      className="poster_image"
                      src={element.images}
                      onClick={() => {
                        history.push(`/activities/activity/${element.id}`);
                      }}
                    />
                  </div>
                  <div className="profile_post_details">
                    <div
                      className="post_info"
                      onClick={() => {
                        history.push(`/activities/activity/${element.id}`);
                      }}
                    >
                      <h2 style={{ color: "rgb(232,180,48)", fontWeight: "bold" }}>
                        {element.title}
                      </h2>
                      <p className="text">location : {element.location}</p>
                      <p className="text">activities to do :{element.activities}</p>
                      <p className="text">
                        Start date :{" "}
                        {moment(element.start_date, "YYYY-MM-DD")
                          .add(1, "days")
                          .format("DD-MM-YYYY")}
                      </p >
                      <p className="text">
                        Finish date :{" "}
                        {moment(element.finish_date, "YYYY-MM-DD")
                          .add(1, "days")
                          .format("DD-MM-YYYY")}
                      </p>
                      <p className="text">
                        estimated budget : {element.estimated_budget}
                      </p>
                      <br />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>}
    </>
  );
};

export default ProfileUserActivities;
