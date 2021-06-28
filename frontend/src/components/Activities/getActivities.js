import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const Activities = () => {
    const [activities, setactivities] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();



    useEffect(() => {
        axios.get(`http://localhost:5000/activities/1`)
            .then((result) => {
                console.log("res", result.data)
                setactivities(result.data)
            })
            .catch((err) => {
                throw err;
            });
    }, []
    )
    return (
        <>
            {activities && activities.map((elem, i) => {
                return (<div className="childrestaurant" key={i}>
                   <p>{elem.title}</p>
                   <p>{elem.requirements}</p>
                </div> )
            })}
        </>
    );
};

export default Activities;
