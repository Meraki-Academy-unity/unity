import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, Route, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import UpdateComment from "./updateComment";
import DeleteComments from "./deleteComment";
import id from "../../reducers/userID";

const AddComment = ({ activity_id }) => {
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
      .get(`http://localhost:5000/activities/comment/${activity_id}`)
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
        `http://localhost:5000/activities/comment/${activity_id}`,
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

  const update = (id) => {
    axios
      .put(
        `http://localhost:5000/activities/comment/${id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setShow(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:5000/activities/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
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
                          className="member_image"
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
                          className="member_image"
                        ></img>
                        <p className="text" style={{ textAlign: "center" }}>
                          {" "}
                          {elem.first_name}
                        </p>
                      </div>
                    </Link>
                  )}
                  
                  {(state.token && state.id == elem.user_id) ? <>{ (!show) ? <div className="commentActRight"> 
                  <p className="text"> {elem.content}</p>
                  <button onClick={()=>{setShow(true)}}>Update</button> <button onClick={()=>{deleteComment(elem.id)}}>Delete</button> </div> : <div className="commentActRight">
                  <textarea defaultValue={elem.content} onChange={(e)=>{setContent(e.target.value)}} /> 
                  <button onClick={()=>{update(elem.id)}}>Update</button> <button onClick={()=>{setShow(true)}}>Cancel</button> 
                  </div> } </> : <div className="commentActRight">
                  <p className="text"> {elem.content}</p>
                      </div>}

                    {/* {state.token ? (
                      <button onClick={() => setShow(!show)}>update</button>
                    ) : (
                      ""
                    )}
                    {state.token ? <DeleteComments comment_id={elem.id} /> : ""}
                    {show && state.token ? (
                      <UpdateComment comment_id={elem.id} />
                    ) : (
                      ""
                    )} */}
                  
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

export default AddComment;
