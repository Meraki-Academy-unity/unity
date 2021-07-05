import React, { useEffect, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import"./../Activities/style.css"


const GetTravelById = (id) => {
    const [travel, setTravel] = useState("")
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });

    useEffect(() => {
        axios.get(`http://localhost:5000${id.location.pathname}`)
            .then((result) => {
                console.log("travel", result.data)
                setTravel(result.data[0])
            })
            .catch((err) => {
                throw err;
            })
    }, [])
    return (<>
        <div>

            <div className="post">
                <h1>{travel.title}</h1>
                <img src={travel.images} className="postImg"></img>
                <p>countries: {travel.countries}</p>
                <p>activities: {travel.activities}</p>
                <p>requirements: {travel.requirements}</p>
                <p>details : {travel.details}</p>
                <p>activities: {travel.activities}</p>
                <p>estimated budget: {travel.estimated_budget}</p>
                <p>
                    created by :{" "}
                    <Link to={`/users/user/${travel.user_id}`}>
                        {travel.first_name} {travel.last_name}
                    </Link>
                </p>
                <br />
            </div>

        </div>

    </>)
}

export default GetTravelById