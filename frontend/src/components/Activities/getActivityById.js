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
            return  <div key={ind}>
                <h1>{res.title}</h1>
                <p>location: {res.location}</p>
                <p>activities: {res.activities}</p>
                <p>requirements: {res.requirements}</p>
                <p>details : {res.details}</p>
                <br/>
            </div>
        })}
        </div>
        
        </>)
}

export default GetActivityById