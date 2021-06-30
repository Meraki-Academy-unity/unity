import React, { useEffect, useState , } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link, Route } from "react-router-dom";


const GetTravelById = (id)=>{
    const [travel , setTravel] = useState([])
    useEffect(() => {
    axios.get(`http://localhost:5000${id.location.pathname}`)
        .then((result) => {
            setTravel(result.data)
        })
        .catch((err) => {
            throw err;
        })}, [] )
        return (<>
        <div>
        {travel && travel.map((res,ind)=>{
            return  <div key={ind}>
                <h1>{res.title}</h1>
                <p>countries: {res.countries}</p>
                <p>activities: {res.activities}</p>
                <p>requirements: {res.requirements}</p>
                <p>details : {res.details}</p>
                <br/>
            </div>
        })}
        </div>
        
        </>)
}

export default GetTravelById