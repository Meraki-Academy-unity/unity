import React, { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const GetAllTravel = ()=>{
    const [travel , setTravel] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/travelPlans`)
            .then((result) => {
                console.log("res", result.data)
                setTravel(result.data)
            })
            .catch((err) => {
                throw err;
            });
    }, []
    )
    return (
        <>
        {travel.map((res,ind)=>{
            return <div>
                <p>{res.first_name} {res.last_name}</p>
                <h2>{res.title}</h2>
                <p>{res.activities}</p>
                <p>{res.countries}</p>
                <p>{res.creation_time}</p>
                <br/>
            </div>
        })}
        </>
    )
}


export default GetAllTravel