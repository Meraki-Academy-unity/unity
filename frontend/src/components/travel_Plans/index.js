import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from "react-redux";
import LoaderBar from "../loadingBar/loaderBar";
import PerferencesLocation from "../Api/perferencesLocation";
import moment from 'moment';
import axios from "axios";

const AddTravelPlans = () => {
  const [title, setTitle] = useState("");
  const [start_date, setStart_date] = useState("");
  const [finish_date, setFinish_date] = useState("");
  const [details, setDetails] = useState("");
  const [requirements, setRequirements] = useState("");
  const [activities, setActivities] = useState("");
  const [images, setImages] = useState("");
  const [estimated_budget, setEstimated_budget] = useState("");
  const [errorImgMessage, setErrorImgMessage] = useState();
  const [prefenecesLocation, setPrefenecesLocation] = useState("")
  const [file, setFile] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token
    };
  });

  const addNewTravelPlans = async () => {
    setImages(state.url);
    axios
      .post(`http://localhost:5000/travelPlans`, {
        title,
        start_date,
        finish_date,
        countries: prefenecesLocation,
        activities,
        requirements,
        details,
        images,
        estimated_budget,
      }, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      })
      .then((result) => {
        console.log("res", result.data);
      })
      .catch((err) => {
        throw err;
      });
  };


  const uploadImage = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage && types.includes(selectedImage.type)) {
      setFile(selectedImage);
      setErrorImgMessage("");
    } else {
      setFile(null);
      setErrorImgMessage("please select image type of png or jpeg");
    }
  };
  let minStartDate = moment(new Date(), "YYYY-MM-DD").add(5, 'days').format("YYYY-MM-DD")
  let maxStartDate = moment(new Date(), "YYYY-MM-DD").add(1, 'y').format("YYYY-MM-DD")
  let minFinishtDate = moment(start_date, "YYYY-MM-DD").add(7, 'd').format("YYYY-MM-DD")
  let maxFinishDate = moment(start_date, "YYYY-MM-DD").add(6, 'months').format("YYYY-MM-DD")

  return (
    <>

      <input
        type="text"
        placeholder="title here"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>

        <label>Start Date : </label>
        <input type="date"
          min={minStartDate}
          max={maxStartDate} onChange={(e) => setStart_date(e.target.value)} />
        {start_date}
        <label>Finish Date : </label>
        <input type="date" min={minFinishtDate}
          max={maxFinishDate} onChange={(e) => setFinish_date(e.target.value)} />
        <label>Activities : </label>

      </div>
      < PerferencesLocation setPrefenecesLocation={setPrefenecesLocation} />
      <textarea
        placeholder="Details"
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      <textarea
        placeholder="Requirements"
        onChange={(e) => setRequirements(e.target.value)}
      ></textarea>
      <textarea
        placeholder="Activities"
        onChange={(e) => setActivities(e.target.value)}
      ></textarea>
      <input type="file" onChange={uploadImage} />
      {file && <LoaderBar file={file} setFile={setFile} />}
      {errorImgMessage && <div>{errorImgMessage}</div>}
      <input
        type="text"
        placeholder=" estimated budget here"
        onChange={(e) => setEstimated_budget(e.target.value)}
      />
      <button onClick={addNewTravelPlans}>create Travel Plans</button>
    </>
  );
};

export default AddTravelPlans;
