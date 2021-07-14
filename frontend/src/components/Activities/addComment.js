import React, { useEffect, useState , } from 'react';
import axios from 'axios';
import { Link, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import UpdateComment from "./updateComment";
import DeleteComments from "./deleteComment";



const AddComment = ({activity_id})=>{
    const [content , setContent] = useState("")
    const [comment, setComment] = useState([]);
    const [show, setShow] = useState(false);
    const state = useSelector((state) => {
        return {
          token: state.login.token,
        };
      });




      useEffect(()=>{
        axios
      .get(`http://localhost:5000/activities/comment/${activity_id}`)
      .then((result) => {
        setComment(result.data)
      })
      .catch((err) => {
        throw err;
      });
      },[comment])


    const add =()=>{
        axios.post(`http://localhost:5000/activities/comment/${activity_id}`, {content} ,{
            headers: {
              Authorization: `Bearer ${state.token}`,
            }
          }).then((result)=>{
                console.log(result);
          }).catch((err)=>{
              console.log(err)
          })
    }
    return <>
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




    <textarea onChange={(e)=>{setContent(e.target.value)}} placeholder="Write your comment here"/>
    <button onClick={add}>Add Comment</button>
    </>
}


export default AddComment ;