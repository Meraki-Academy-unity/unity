import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateComment = ({ comment_id }) => {
  const [content, setContent] = useState("");
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  const update = () => {
    axios
      .put(
        `/activities/comment/${comment_id}`,
        { content },
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
  return (
    <>
      <textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="Write your comment here"
      />
      <button onClick={update}>update</button>
    </>
  );
};

export default UpdateComment;
