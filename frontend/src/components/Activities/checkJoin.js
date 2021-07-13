import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Join from "./activityJoin";




const CheckJoin = ({ activity_id }) => {
  const [show, setShow] = useState(true)
  const [join, setJoin] = useState(false);
  const [members, setMembers] = useState([]);
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id
    };
  });

  axios
    .get(`http://localhost:5000/activities/member/${activity_id}`, {
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
    setShow(false)
    await axios
      .get(`http://localhost:5000/activities/members/${activity_id}`)
      .then((result) => {
        setMembers(result.data)
      })
      .catch((err) => {
        console.log("err", err);
      });
  }


  const AddMember = () => {
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

  const DeleteMember = () => {
    axios
      .delete(
        `http://localhost:5000/activities/activity/${activity_id}`,
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

  return <><div className = "btnCont">
    {!join ? (
      <button className="join" onClick={AddMember}>Join</button>
    ) : (
      <button className="join" onClick={DeleteMember}>Leave</button>
    )}

    {show ? <button className="show" onClick={ShowMembers}>Show All Members</button> : <button className="show" onClick={() => {
      { setShow(true) }
      { setMembers([]) }
    }}>Hide Members</button>}
    </div>
    {members && members.map((elem, ind) => {
      return <div key={ind}>
        <img src={elem.profile_image} style={{ width: "100px" }}></img>
        {state.id !== elem.id ? (<Link to={`/users/user/${elem.id}`}>
          {elem.first_name} {elem.last_name}
        </Link>) : (<Link to={`/profile`}>
          {elem.first_name} {elem.last_name}
        </Link>)}
      </div>
    })}
  </>
}



export default CheckJoin