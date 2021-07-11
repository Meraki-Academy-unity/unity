import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

// import { changeUser } from "../../../../backend/db/db";

let socket;
const CONNECTION_PORT = "http://localhost:5000";

socket = io(CONNECTION_PORT);

const Chat = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [profile, setProfile] = useState("");
  const { id } = useParams();

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room); //raise event
  };

  const sendMessage = async () => {
    const messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    console.log("messageContent.room: ", messageContent.room);
    await axios
      .post(
        "http://localhost:5000/messages/",
        {
          room_id: messageContent.room,
          content: messageContent.content.message,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        console.log("Message sent: ", result);
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
      // setProfile(result.data)
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
              <input
                type="text"
                placeholder="Write your message here ..."
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
