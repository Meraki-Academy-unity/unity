import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./inbox.css";

const Inobx = ({ setIsHome }) => {
  const [inbox, setInbox] = useState("");
  const [myData, setMyData] = useState("");
  const [userData, setUserData] = useState([]);
  setIsHome(false);
  const history = useHistory();

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
      .get(`http://localhost:5000/users/user/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
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
    <>
      <div className="inbox_page">
        <h1>Inbox</h1>
        {inbox &&
          inbox.map((elem, i) => {
            return (
              <div key={i} className="inbox">

                {elem.sender_id == state.id ? (
                  <div
                    className="sender"
                    onClick={() => {
                      history.push(`/chat/${elem.receiver_id}`);
                    }}
                  >
                    <img src={elem.profile_image} style={{ width: "100px" }} />
                    <div className="senderInfo">
                      <p
                        style={{
                          marginTop: "15px",
                          fontSize: "22px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {elem.first_name}
                      </p>
                      <p
                        style={{
                          marginTop: "5px",
                          fontSize: "16px",
                          color: "black",
                        }}
                      >
                        {" "}
                        You : {elem.content}
                      </p>
                    </div>

                  </div>
                ) : (
                  <div
                    className="sender"
                    onClick={() => {
                      history.push(`/chat/${elem.sender_id}`);
                    }}
                  >
                    <img
                      style={{ width: "100px" }}
                      src={userData[i] && userData[i].profile_image}
                    />
                    <div className="senderInfo">
                      <p
                        style={{
                          marginTop: "15px",
                          fontSize: "22px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {userData[i] && userData[i].first_name}
                      </p>
                      <p
                        style={{
                          marginTop: "5px",
                          fontSize: "16px",
                          color: "black",
                        }}
                      >
                        {" "}
                        {userData[i] && userData[i].first_name} : {elem.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Inobx;
