import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteTravelComments from "./deleteTravelComment";
import UpdateTravelComment from "./updateTravelComment";

const AddTravelComment = ({ travel_id }) => {
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/travelPlans/comments/${travel_id}`)
      .then((result) => {
        setComment(result.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [comment]);

  const addComment = () => {
    axios
      .post(
        `http://localhost:5000/travelPlans/comment/${travel_id}`,
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
      <div className="comment">
        {comment &&
          comment.map((element, index) => {
            return (
              <div key={index}>
                <img
                  src={element.profile_image}
                  style={{ width: "100px" }}
                ></img>
                <p>user : {element.first_name}</p>
                <p>comment: {element.content}</p>
                {state.token ? (
                  <DeleteTravelComments comment_id={element.id} />
                ) : (
                  ""
                )}

                {state.token ? (
                  <button onClick={() => setShow(!show)}>update</button>
                ) : (
                  ""
                )}
                {show && state.token ? (
                  <UpdateTravelComment comment_id={element.id} />
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>

      <textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="Write your comment here"
      />
      <button onClick={addComment}>Add Comment</button>
    </>
  );
};

export default AddTravelComment;
