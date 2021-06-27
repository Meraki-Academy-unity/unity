import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const AddTravelPlans = () => {
    const [title, setTitle] = useState("");
    const [start_date, setStart_date] = useState("");
    const [finish_date, setFinish_date] = useState("");
    const [details, setDetails] = useState("");
    const [countries , setCountries] = useState("")
    const [requirements, setRequirements] = useState("");
    const [activities, setActivities] = useState("");
    const [images, setImages] = useState("");
    const [estimated_budget, setEstimated_budget] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    const addNewTravelPlans = () => {
        //
        axios.post(`http://localhost:5000/travelPlans/1`,
            { title, start_date, finish_date, countries,activities, requirements,details, images, estimated_budget })
            .then((result) => {
                console.log("res", result.data)
            })
            .catch((err) => {
                throw err;
            });
    }



    return (
        <>
            <input type="text" placeholder="title here" onChange={(e) => setTitle(e.target.value)} />
            <input type="date" onChange={(e) => setStart_date(e.target.value)} />
            <input type="date" onChange={(e) => setFinish_date(e.target.value)} />
            <input type="text" placeholder="Country here" onChange={(e)=> setCountries(e.target.value)} />
            <textarea placeholder="Details" onChange={(e) => setDetails(e.target.value)}></textarea>
            <textarea placeholder="Requirements" onChange={(e) => setRequirements(e.target.value)}></textarea>
            <textarea placeholder="Activities" onChange={(e) => setActivities(e.target.value)}></textarea>
            <input type="text" placeholder="image here" onChange={(e) => setImages(e.target.value)} />
            <input type="text" placeholder=" estimated budget here" onChange={(e) => setEstimated_budget(e.target.value)} />
            <button onClick={addNewTravelPlans}>create Travel Plans</button>

        </>
    );
};

export default AddTravelPlans;