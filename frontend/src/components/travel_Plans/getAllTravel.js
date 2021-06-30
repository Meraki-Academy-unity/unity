import React, { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link, Route } from "react-router-dom";


const GetAllTravel = ()=>{
    const [travels , setTravels] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/travelPlans`)
            .then((result) => {
                console.log("res", result.data)
                setTravels(result.data)
            })
            .catch((err) => {
                throw err;
            })} , []);

    
    
    return (
        <>
        <br/>
        <h1>Travel plans</h1>
        <br/>
        {travels && travels.map((res,ind)=>{
            return <Link to={`/travelPlans/${res.id}` } key={ind}> <div>
                <p>{res.first_name} {res.last_name}</p>
                <h2>{res.title}</h2>
                <p>{res.activities}</p>
                <p>{res.countries}</p>
                <p>{res.creation_time}</p>
                <br/>
            </div></Link>
        })}
        </>
    )
}


export default GetAllTravel