import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import InputEmoji from 'react-input-emoji'
import "./chat.css"

let socket;
const CONNECTION_PORT = "http://localhost:5000";
socket = io(CONNECTION_PORT);

const Chat = ({setIsHome}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [chatHistory, setChatHistory] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState("")
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id
    };
  });
  setIsHome(false);
  useEffect(()=>{
    axios
    .get("http://localhost:5000/users/myProfile", {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
    .then((result) => {
      setUserName(result.data[0].first_name);
      if (result.data[0].id > id) {
        setRoom(Number("" + id + result.data[0].id));

      } else {
        setRoom(Number("" + result.data[0].id + id));

      }
      connectToRoom();
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .get(`http://localhost:5000/users/user/${id}`)
    .then((result) => {
      setUser(result.data[0])
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  


  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room); //raise event
  };

  // useEffect(async () => {
     axios
      .get(`http://localhost:5000/messages/${room}`)
      .then((result) => {
        console.log("chat history: ", result);
        setChatHistory(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  // }, [message || room]);

  const sendMessage = async () => {
    const messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    if (message) {
      await axios
        .post(
          "http://localhost:5000/messages/",
          {
            room_id: messageContent.room,
            content: messageContent.content.message,
            receiver_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        )
        .then((result) => {

        })
        .catch((err) => {
          console.log(err);
        });
    }

    socket.emit("send_message", messageContent); //raise event
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
    console.log("messageContent: ", messageContent);
  };

  

  // function handleOnEnter(message) {
  //   setMessage(message);
  //   console.log('enter', message)
  // }

  return (
    <>
      <div className="chat">
        {/* {profile.id > id ? setRoom(Number("" + id + profile.id)) : setRoom(Number("" +profile.id + id))} */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="userName">
          <svg onClick={() => {
            history.go(-1)
          }} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
          </svg>
          <img src={user.profile_image} />
          <p>{user.first_name}</p>

        </div>
        <div className="chatHome">
          <div className="chatPageContainer">
            <div className="chatPage"  >
              {chatHistory &&
                chatHistory.map((elem, i) => {
                  return (
                    <div key={i}>

                      {(elem.sender_id === state.id) ? <div className="myChat">
                        <div className="myInfo">

                          <p className="myContent" >{elem.content}</p>
                        </div>
                        <img src={elem.profile_image} className="userChatImg" />

                      </div> :
                        <div className="userChat" >
                          <img src={elem.profile_image} className="userChatImg" />
                          <div className="Info">
                            <p className="userContent">{elem.content}</p>
                          </div>

                        </div>}
                    </div>
                  );
                })}
            </div>
          </div>
          <div>

            {!loggedIn ? (
              ""
            ) : (
              <>
                <div className="chatInput">
                  <div className="emoji">
                    <InputEmoji
                      value={message}
                      onChange={setMessage}
                      cleanOnEnter
                      onEnter={sendMessage}
                      placeholder="Type a message"
                      borderRadius="5px"
                      borderColor="rgba(0, 0, 0, 0.3)"
                    />
                  </div>
                  <div className="sendButton">
                    <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cursor-fill" viewBox="0 0 16 16" color="#ffffff">
                      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default Chat;
