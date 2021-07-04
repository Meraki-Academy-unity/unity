import React, { useEffect, useState , } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link, Route } from "react-router-dom";


const GetActivityById = (id)=>{
    const [comment , setComment] = useState([]);
    const [activity , setActivity] = useState([]);
    useEffect(async() => {
    await axios.get(`http://localhost:5000${id.location.pathname}`)
        .then((result) => {
            setActivity(result.data)
            console.log(activity)
        })
        .catch((err) => {
            throw err;
        })
        
    
    
    
    } , [] )
    if (activity.length > 0){
        axios.get(`http://localhost:5000/activities/comment/${activity[0].id}`).then((result) =>{
            console.log(result)
            setComment(result.data)
        }).catch((err)=>{
            throw err ;
        })
    }
    
        return (<>
        <div >
        {console.log(activity)}
        {activity && activity.map((res,ind)=>{
            return  <div key={ind}  className="post"> 
                <img src={res.images} className="postImg"></img>
                <h1>{res.title}</h1>
                <p>location: {res.location}</p>
                <p>start date: {res.start_date}</p>
                <p>finish date: {res.finish_date}</p>
                <p>details : {res.details}</p>
                <p>requirements: {res.requirements}</p>
                <p>activities: {res.activities}</p>
                <p>estimated budget: {res.estimated_budget}</p>
                <p>created by : <Link to={`/users/user/${res.user_id}`}>{res.first_name} {res.last_name}</Link></p>
            </div>
        })}
        <div className="comment">
        {comment && comment.map((res,ind)=>{
            return  <div key={ind} > 
                <p>user : {res.first_name}</p>
                <p>comment: {res.content}</p>
            </div>
        })}

        </div>
        </div>
        
        </>)
}

export default GetActivityById