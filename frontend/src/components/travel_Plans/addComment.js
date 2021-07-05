import React, { useEffect, useState , } from 'react';
import axios from 'axios';
import { Link, Route } from "react-router-dom";
import { useSelector } from 'react-redux';


const AddTravelComment = ({travel_id})=>{
    const [content , setContent] = useState("")
    const state = useSelector((state) => {
        return {
          token: state.login.token,
        };
      });
    
    const addComment =()=>{
        axios.post(`http://localhost:5000/travelPlans/comment/${travel_id}`, {content} ,{
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
    <textarea onChange={(e)=>{setContent(e.target.value)}} placeholder="Write your comment here"/>
    <button onClick={addComment}>Add Comment</button>
    </>
}


export default AddTravelComment ;