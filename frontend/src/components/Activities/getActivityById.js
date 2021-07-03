import React, { useEffect, useState , } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link, Route } from "react-router-dom";


const GetActivityById = (id)=>{
    const [activity , setActivity] = useState([])
    useEffect(() => {
    axios.get(`http://localhost:5000${id.location.pathname}`)
        .then((result) => {
            setActivity(result.data)
        })
        .catch((err) => {
            throw err;
        })}, [] )
        return (<>
        <div>
        {activity && activity.map((res,ind)=>{
            return  <div key={ind} className="post"> 
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
        </div>
        
        </>)
}

export default GetActivityById