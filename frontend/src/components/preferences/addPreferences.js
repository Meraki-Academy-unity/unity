import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const AddActivities = () => {
    const [location, setLocation] = useState("");
    const [start_date, setStart_date] = useState("");
    const [finish_date, setFinish_date] = useState("");
    const [activities, setActivities] = useState("");
    const [similar_age, setSimilar_age] = useState("");
    const [same_gender, setSame_gender] = useState("");
    const [images, setImages] = useState("");
    const [estimated_budget, setEstimated_budget] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    const addNewActivities = () => {
        //
        axios.post(`http://localhost:5000/activities/1`,
            { title, start_date, finish_date, details, requirements, activities, images, estimated_budget })
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
            <textarea onChange={(e) => setDetails(e.target.value)}></textarea>
            <textarea onChange={(e) => setRequirements(e.target.value)}></textarea>
            <textarea onChange={(e) => setActivities(e.target.value)}></textarea>
            <input type="text" placeholder="image here" onChange={(e) => setImages(e.target.value)} />
            <input type="text" placeholder=" estimated budget here" onChange={(e) => setEstimated_budget(e.target.value)} />
            <button onClick={addNewActivities}>create activities</button>

        </>
    );
};

export default AddActivities;
