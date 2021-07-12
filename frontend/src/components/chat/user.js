import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { io } from "socket.io-client";
import Emoji from "./emoji";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmoji } from "../../reducers/emoji";

// import { changeUser } from "../../../../backend/db/db";

let socket;
const CONNECTION_PORT = "http://localhost:5000";

socket = io(CONNECTION_PORT);

const Chat = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [chatHistory, setChatHistory] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [profile, setProfile] = useState("");
  const dispatch = useDispatch();

  const [show, setShow] = useState(false)
  const { id } = useParams();

  const state = useSelector((state) => {
    return {
      token: state.login.token,
      emoji: state.emoji.emoji
    };
  });
  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room); //raise event
  };

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/messages/${room}`)
      .then((result) => {
        console.log("chat history: ", result);
        setChatHistory(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [room]);

  const sendMessage = async () => {
    const messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

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

    socket.emit("send_message", messageContent); //raise event
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
    console.log("messageContent: ", messageContent);
  };

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
        console.log("testroom", room);
      } else {
        setRoom(Number("" + result.data[0].id + id));
        console.log("testroom", room);
      }
      connectToRoom();
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <div className="App">
        {/* {profile.id > id ? setRoom(Number("" + id + profile.id)) : setRoom(Number("" +profile.id + id))} */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <h1>CHAAAAT</h1>
        {chatHistory &&
          chatHistory.map((elem, i) => {
            return (
              <div key={i}>
                <img src={elem.profile_image} style={{ width: "100px" }} />
                <p>{elem.first_name}</p>
                <div>{elem.content}</div>
              </div>
            );
          })}

        {/* {console.log("lo", loggedIn)} */}
        {!loggedIn ? (
          ""
        ) : (
          <>
            <div>
              {messageList.map((val, i) => {
                return (
                  <h1 key={i}>
                    {val.author} {val.message}
                  </h1>
                );
              })}
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Write your message here ..."
                onChange={(e) => setMessage(e.target.value + state.emoji)}
              />
              <svg onClick={() => {
                setShow(!show)
              }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
              </svg>
              {show ? <Emoji /> : ""}
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
