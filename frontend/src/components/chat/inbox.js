import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./inbox.css";

const Inobx = () => {
  const [inbox, setInbox] = useState("");
  const [myData, setMyData] = useState("");
  const [userData, setUserData] = useState([]);
  const history = useHistory()

  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id,
    };
  });

  const getMyInfo = () => {
    axios
      .get("http://localhost:5000/users/myProfile", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setMyData(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserInfo = (id) => {
    axios
      .get(`http://localhost:5000/users/user/${id}`)
      .then((result) => {
        setUserData((userData) => [...userData, result.data[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(async () => {
    getMyInfo();
    axios
      .get("http://localhost:5000/messages/", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setInbox(result.data);
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].sender_id !== state.id)
            getUserInfo(result.data[i].sender_id);
          else {
            getUserInfo(result.data[i].receiver_id);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Inbox</h1>
      {inbox &&
        inbox.map((elem, i) => {
          return (
            <div key={i} className="inbox">

              {elem.sender_id === state.id ? (

                <div onClick={() => {
                  history.push(`/chat/${elem.receiver_id}`)
                }}>
                  <img src={myData.profile_image} style={{ width: "100px" }} />
                  <p>{myData.first_name}</p>
                  sent to
                  <img src={elem.profile_image} style={{ width: "100px" }} />
                  <p>{elem.first_name}</p>
                  <p>{elem.content}</p>
                </div>


              ) : (
                <div onClick={() => {
                  history.push(`/chat/${elem.receiver_id}`)
                }}>
                  <img src={myData.profile_image} style={{ width: "100px" }} />
                  <p>{myData.first_name}</p>
                  received from
                  <img
                    style={{ width: "100px" }}
                    src={userData[i] && userData[i].profile_image}
                  />
                  <p>{userData[i] && userData[i].first_name}</p>
                  <p>{elem.content}</p>
                </div>

              )}
            </div>
          );
        })}
    </div>
  );
};

export default Inobx;
