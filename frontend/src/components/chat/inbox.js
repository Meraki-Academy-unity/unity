import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

const Inobx = () => {
  const [inbox, setInbox] = useState("");

  axios
    .get("http://localhost:5000/messages/", {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
    .then((result) => {
      console.log("inbox content: ", result.data);
      setInbox(result.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <h1>Inbox</h1>
      {/* {inbox && inbox. */}
    </div>
  );
};

export default Inobx;



