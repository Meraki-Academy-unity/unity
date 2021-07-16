import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteTravelComments from "./deleteTravelComment";
import UpdateTravelComment from "./updateTravelComment";

const AddTravelComment = ({ travel_id }) => {
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  const [show, setShow] = useState(false);
  const state = useSelector((state) => {
    return {
      token: state.login.token,

      id: state.id.id,

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


  const add = () => {
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
      <div className="comments">
        <h1>Comments :- </h1>
        {comment &&
          comment.map((elem, i) => {
            return (
              <>
                <div className="commentAct">
                  {state.id != elem.user_id ? (
                    <Link className="link" to={"/users/user/" + elem.user_id}>
                      <div key={i} className="commentActLeft">
                        <img
                          src={elem.profile_image}
                          className ="member_image"
                        ></img>
                        <p className="text" style={{ textAlign: "center" }}>
                          {" "}
                          {elem.first_name}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <Link className="link" to={"/profile"}>
                      <div key={i} className="commentActLeft">
                        <img
                          src={elem.profile_image}
                          className ="member_image"
                        ></img>
                        <p className="text" style={{ textAlign: "center" }}>
                          {" "}
                          {elem.first_name}
                        </p>
                      </div>
                    </Link>
                  )}

                  <div className="commentActRight">
                    <p className="text"> {elem.content}</p>
                    {state.token ? (
                      <button onClick={() => setShow(!show)}>update</button>
                    ) : (
                      ""
                    )}
                    {state.token ? <DeleteTravelComments comment_id={elem.id} /> : ""}
                    {show && state.token ? (
                      <UpdateTravelComment comment_id={elem.id} />
                    ) : (
                      ""
                    )}
                  </div>

                </div>
              </>
            );
          })}


        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Write your comment here"
        />
        <button onClick={add}>Add Comment</button>
      </div>

    </>
  );
};

export default AddTravelComment;
