import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from 'react-redux';
import LoaderBar from '../loadingBar/loaderBar';
import axios from 'axios';


const AddTravelPlans = () => {
    const [title, setTitle] = useState("");
    const [start_date, setStart_date] = useState("");
    const [finish_date, setFinish_date] = useState("");
    const [details, setDetails] = useState("");
    const [countries, setCountries] = useState("")
    const [requirements, setRequirements] = useState("");
    const [activities, setActivities] = useState("");
    const [images, setImages] = useState("");
    const [estimated_budget, setEstimated_budget] = useState("");
    const [errorImgMessage, setErrorImgMessage] = useState()
    const [file, setFile] = useState(null)

    const types = ["image/png", "image/jpeg"]

    const history = useHistory();
    const dispatch = useDispatch();

    const state = useSelector((state) => {
        return {
            url: state.imgUploader.url
        };
    });
    console.log("state travel plans", state)

    const addNewTravelPlans = () => {
        setImages(state.url)
        axios.post(`http://localhost:5000/travelPlans/1`,
            { title, start_date, finish_date, countries, activities, requirements, details, images, estimated_budget })
            .then((result) => {
                console.log("res", result.data)
            })
            .catch((err) => {
                throw err;
            });
    }

    const uploadImage = (e) => {
        let selectedImage = e.target.files[0];
        if (selectedImage && types.includes(selectedImage.type)) {
            setFile(selectedImage)
            setErrorImgMessage("")
        }
        else {
            setFile(null)
            setErrorImgMessage("please select image type of png or jpeg")
        }
    }

    return (
        <>
            <input type="text" placeholder="title here" onChange={(e) => setTitle(e.target.value)} />
            <input type="date" onChange={(e) => setStart_date(e.target.value)} />
            <input type="date" onChange={(e) => setFinish_date(e.target.value)} />
            <input type="text" placeholder="Country here" onChange={(e) => setCountries(e.target.value)} />
            <textarea placeholder="Details" onChange={(e) => setDetails(e.target.value)}></textarea>
            <textarea placeholder="Requirements" onChange={(e) => setRequirements(e.target.value)}></textarea>
            <textarea placeholder="Activities" onChange={(e) => setActivities(e.target.value)}></textarea>
            {/* <input type="text" placeholder="image here" onChange={(e) => setImages(e.target.value)} /> */}
            {file && <LoaderBar file={file} setFile={setFile} />}
            <input type='file' onChange={uploadImage} />
            {errorImgMessage && <div>{errorImgMessage}</div>}
            <input type="text" placeholder=" estimated budget here" onChange={(e) => setEstimated_budget(e.target.value)} />
            <button onClick={addNewTravelPlans}>create Travel Plans</button>

        </>
    );
};

export default AddTravelPlans;