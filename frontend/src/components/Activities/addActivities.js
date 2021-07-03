import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from "react-redux";
import LoaderBar from "../loadingBar/loaderBar";
import axios from "axios";

const AddActivities = () => {
  const [title, setTitle] = useState("");
  const [start_date, setStart_date] = useState("");
  const [finish_date, setFinish_date] = useState("");
  const [details, setDetails] = useState("");
  const [requirements, setRequirements] = useState("");
  const [activities, setActivities] = useState("");
  const [images, setImages] = useState("");
  const [estimated_budget, setEstimated_budget] = useState("");
  const [errorImgMessage, setErrorImgMessage] = useState();
  const [file, setFile] = useState(null);
  const [done , setDone] = useState(false);

  const types = ["image/png", "image/jpeg"];
  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token
    };
  });

  const testUpload = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage && types.includes(selectedImage.type)) {
      setFile(selectedImage);
      setErrorImgMessage("");
    } else {
      setFile(null);
      setErrorImgMessage("please select image type of png or jpeg");
    }
  };
  useEffect(()=>{axios
    .post(`http://localhost:5000/activities/`, {
      title,
      start_date,
      finish_date,
      details,
      requirements,
      activities,
      images,
      estimated_budget,
    } ,{headers: {
      Authorization: `Bearer ${state.token}`,
    }})
    .then((result) => {
      console.log("res", result.data);
    })
    .catch((err) => {
      throw err;
    });},[done])



  const addNewActivities = () => {
    setDone(true);
    setImages(state.url);
    
  };

  return (
    <>
      <input
        type="text"
        placeholder="title here"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="date" onChange={(e) => setStart_date(e.target.value)} />
      <input type="date" onChange={(e) => setFinish_date(e.target.value)} />
      <textarea onChange={(e) => setDetails(e.target.value)}></textarea>
      <textarea onChange={(e) => setRequirements(e.target.value)}></textarea>
      <textarea onChange={(e) => setActivities(e.target.value)}></textarea>
      <input type="file" onChange={testUpload} />
      {file && <LoaderBar file={file} setFile={setFile} />}
      {errorImgMessage && <div>{errorImgMessage}</div>}

      <input
        type="text"
        placeholder=" estimated budget here"
        onChange={(e) => setEstimated_budget(e.target.value)}
      />
      <button onClick={addNewActivities}>create activities</button>
    </>
  );
};

export default AddActivities;
