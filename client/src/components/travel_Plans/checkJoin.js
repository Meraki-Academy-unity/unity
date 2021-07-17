import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import id from "../../reducers/userID";
// import Join from "./activityJoin";

const CheckTravelJoin = ({ travel_id }) => {
  const [show, setShow] = useState(true);
  const [join, setJoin] = useState(false);
  const [members, setMembers] = useState([]);
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id,
    };
  });

  axios
    .get(`/travelPlans/member/${travel_id}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
    .then((result) => {
      if (result.data.length) {
        setJoin(true);
      } else {
        setJoin(false);
      }
    })
    .catch((err) => {
      console.log("err", err);
    });

  const ShowMembers = async () => {
    setShow(false);
    await axios
      .get(`/travelPlans/members/${travel_id}`)
      .then((result) => {
        setMembers(result.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const AddMember = () => {
    axios
      .post(
        `/travelPlans/plan/${travel_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        setJoin(true);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteMember = () => {
    axios
      .delete(`/travelPlans/plan/${travel_id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setJoin(false);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="btnCont">
        {!join ? (
          <button className="actionButton" onClick={AddMember}>
            Join
          </button>
        ) : (
          <button className="actionButton" onClick={DeleteMember}>
            Leave
          </button>
        )}

        {show ? (
          <button className="actionButton" onClick={ShowMembers}>
            Show All Members
          </button>
        ) : (
          <button
            className="show"
            onClick={() => {
              {
                setShow(true);
              }
              {
                setMembers([]);
              }
            }}
          >
            Hide Members
          </button>
        )}
      </div>
      <div className="member_page">
        {members &&
          members.map((elem, i) => {
            return (
              <div key={i} className="joined_member">
                {state.id != elem.id ? (
                  <Link className="link" to={`/users/user/${elem.id}`}>
                    <img
                      src={elem.profile_image}
                      className="member_image"
                    ></img>
                    <p className="text">{elem.first_name}</p>
                  </Link>
                ) : (
                  <Link className="link" to={`/profile`}>
                    <img
                      src={elem.profile_image}
                      className="member_image"
                    ></img>
                    <p className="text">{elem.first_name}</p>
                  </Link>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CheckTravelJoin;
