import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useParams, useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import img from '../chat/notFound.png'


const ProfileUserPlans = ({ id }) => {
  console.log("id", id)
  const [plansProf, setPlansProf] = useState([]);
  // const { id } = useParams();
  const history = useHistory();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
  useEffect(() => {
    axios
      .get(`/travelPlans/all/user/${id}`)
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
      {!plansProf ? (<div className="notFound">
        {" "}
        <img width="500px" src={img}/>
        <p>No Activities to show</p>{" "}
      </div>) :
        <div className="profile_post_page">
          {plansProf &&
            plansProf.map((element, ind) => {
              return (
                <div className="post_card" key={ind}>
                  <img
                    className="poster_image"
                    src={element.images}
                    onClick={() => {
                      history.push(`/travelPlans/${element.id}`);
                    }}
                  />
                  <div className="profile_post_details" >
                    <div
                      className="post_info"
                      onClick={() => {
                        history.push(`/activities/activity/${element.id}`);
                      }}
                    >
                      <div className="rightAct">
                        <h2 style={{ color: "rgb(232,180,48)", fontWeight: "bold" }}>
                          {element.title}
                        </h2>
                        <p className="text">location : {element.countries}</p>
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
                </div>
              );
            })}
        </div>}
    </>
  );
};

export default ProfileUserPlans;
