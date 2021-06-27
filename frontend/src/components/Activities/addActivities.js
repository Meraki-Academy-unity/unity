import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const AddActivities = () => {
    const [title, setTitle] = useState("");
    const [start_date, setStart_date] = useState("");
    const [finish_date, setFinish_date] = useState("");
    const [location, setLocation] = useState("");
    const [details, setDetails] = useState("");
    const [requirements, setRequirements] = useState("");
    const [activities, setActivities] = useState("");
    const [images, setImages] = useState("");
    const [estimated_budget, setEstimated_budget] = useState("");


    const history = useHistory();
    const dispatch = useDispatch();





    return (
        <>
            <input type="text" placeholder="title here" onChange={(e) => setTitle(e.target.value)} />
            <input type="date" onChange={(e) => setStart_date(e.target.value)} />
            <input type="date" onChange={(e) => setFinish_date(e.target.value)} />
            

            <button>create activities</button>

        </>
    );
};

export default AddActivities;
