import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import moment from "moment";

const ProfilePlans = ({ setIsHome }) => {
  const [plansProf, setPlansProf] = useState([]);
  const history = useHistory();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
  // setIsHome(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/travelPlans/profile/plans`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setPlansProf(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="profile_post_page">
        {plansProf &&
          plansProf.map((element, index) => {
            return (
              <div className="post_card" key={index}>
                <div>
                  <img
                    className="poster_image"
                    src={element.images}
                    onClick={() => {
                      history.push(`/travelPlans/${element.id}`);
                    }}
                  />
                </div>
                <div className="profile_post_details">
                  {/* <div className="uploader">
                    <img src={element.profile_image} className="img"></img>
                    <p style={{ color: "black" }}>
                      {element.first_name} {element.last_name}
                    </p>
                  </div> */}

                  <div
                    className="post_info"
                    onClick={() => {
                      history.push(`/travelPlans/${element.id}`);
                    }}
                  >
                    <h2
                      style={{ color: "rgb(232,180,48)", fontWeight: "bold" }}
                    >
                      {element.title}
                    </h2>
                    <p className="text">location : {element.countries}</p>
                    <p className="text">
                      activities to do :{element.activities}
                    </p>
                    <p className="text">
                      Start date :{" "}
                      {moment(element.start_date, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("DD-MM-YYYY")}
                    </p>
                    <p className="text">
                      Finish date :{" "}
                      {moment(element.finish_date, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("DD-MM-YYYY")}
                    </p>
                    <p className="text">
                      estimated budget : {element.estimated_budget} $
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProfilePlans;
