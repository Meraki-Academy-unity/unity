import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProfileUserActivities = () => {
  const [activitiesProf, setActivitiesProf] = useState([]);
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
      {activitiesProf &&
        activitiesProf.map((element, index) => {
          return (
            <div className="Activity" key={index}>
              <div className="leftAct">
                <img src={element.profile_image} className="img"></img>
                <p style={{ color: "blue", marginLeft: "10px" }}>
                  {element.first_name} {element.last_name}
                </p>
              </div>
              <Link to={`/activities/activity/${element.id}`} key={ind}>
                <div className="rightAct">
                  <h2 style={{ color: "#507fa4", fontWeight: "bolder" }}>
                    {element.title}
                  </h2>
                  <p className="p">location : {element.location}</p>
                  <p className="p">activities to do :{element.activities}</p>
                  <p className="p">start date : {element.start_date}</p>
                  <p className="p">finish date : {element.finish_date}</p>
                  <p className="p">
                    estimated budget : {element.estimated_budget}
                  </p>
                  <br />
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default ProfileUserActivities;
