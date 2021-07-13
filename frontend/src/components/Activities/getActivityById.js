import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import AddComment from "./addComment";
import DeleteComments from "./deleteComment";
import UpdateComment from "./updateComment";
import { useSelector } from "react-redux";
import Join from "./activityJoin";
import CheckJoin from "./checkJoin";
import moment from "moment";

const GetActivityById = (id) => {
  const [comment, setComment] = useState([]);
  const [activity, setActivity] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory()
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id,
    };
  });
  useEffect(async () => {
    await axios
      .get(`http://localhost:5000${id.location.pathname}`)
      .then((result) => {
        setActivity(result.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  if (activity) {
    axios
      .get(`http://localhost:5000/activities/comment/${activity.id}`)
      .then((result) => {
        setComment(result.data);
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <>
      <div style={{marginTop:"85px"}}>
        <div className="post">
          <div className = "postCont">
          <img src={activity.images} className="postImg"></img>
          <h1>{activity.title}</h1>
          <p className="text">location: {activity.location}</p>
          <p className="text">start date: {moment(activity.start_date, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("DD-MM-YYYY")}</p>
          <p className="text" >finish date: {moment(activity.finish_date, "YYYY-MM-DD")
                        .add(1, "days")
                        .format("DD-MM-YYYY")}</p>
          <p className="text">details : {activity.details}</p>
          <p className="text">requirements: {activity.requirements}</p>
          <p className="text">activities: {activity.activities}</p>
          <p className="text">estimated budget: {activity.estimated_budget}</p>
          <p className="text">
            created by :{" "}
            {state.id !== activity.user_id ? (<Link to={`/users/user/${activity.user_id}`}>
              {activity.first_name} {activity.last_name}
            </Link>) : (<Link to={`/profile`}>
              {activity.first_name} {activity.last_name}
            </Link>)}
          </p>
          </div>
        
        {state.token ? <CheckJoin activity_id={activity.id} /> : ""}
        <div className="commentAct">
          {comment &&
            comment.map((res, ind) => {
              return (<>
                <div key={ind} className="commentActLeft">
                  <img src={res.profile_image} style={{ width: "70px" , borderRadius: "50%" }}></img>
                  <p className="text"> {res.first_name}</p> 
                  </div>
                  <div className="commentActRight">
                  <p className="text"> {res.content}</p>
                  {state.token ? <DeleteComments comment_id={res.id} /> : ""}
                  {state.token ? (
                    <button onClick={() => setShow(!show)}>update</button>
                  ) : (
                    ""
                  )}
                  {show && state.token ? (
                    <UpdateComment comment_id={res.id} />
                  ) : (
                    ""
                  )}
                  
                </div>
                </>
              );
            })}
        </div>
        {state.token ? <AddComment activity_id={activity.id} /> : ""}
      </div>
      </div>
    </>
  );
};

export default GetActivityById;
