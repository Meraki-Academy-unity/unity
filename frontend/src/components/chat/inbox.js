import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./inbox.css";

const Inobx = ({setIsHome}) => {
  const [inbox, setInbox] = useState("");
  const [myData, setMyData] = useState("");
  const [userData, setUserData] = useState([]);
  setIsHome(false)
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
          // { getUserInfo(elem.receiver_id) }
          return (
            <div key={i} className="inbox">
              {elem.sender_id === state.id ? (
                <>
                  <img src={myData.profile_image} style={{ width: "100px" }} />
                  <p>{myData.first_name}</p>
                  sent to
                  <img src={elem.profile_image} style={{ width: "100px" }} />
                  <p>{elem.first_name}</p>
                  <p>{elem.content}</p>
                  <Link to={`/chat/${elem.receiver_id}`}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                  <img src={myData.profile_image} style={{ width: "100px" }} />
                  <p>{myData.first_name}</p>
                  received from
                  <img
                    style={{ width: "100px" }}
                    src={userData[i] && userData[i].profile_image}
                  />
                  <p>{userData[i] && userData[i].first_name}</p>
                  <p>{elem.content}</p>
                  <Link to={`/chat/${elem.sender_id}`}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-envelope"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Inobx;
