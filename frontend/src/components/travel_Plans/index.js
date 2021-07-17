import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { setToken } from './../reducer/login/index';
import { useDispatch, useSelector } from "react-redux";
import LoaderBar from "../loadingBar/loaderBar";
import PerferencesLocation from "../Api/perferencesLocation";
import moment from "moment";
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
  const [prefenecesLocation, setPrefenecesLocation] = useState("");
  const [file, setFile] = useState(null);
  const types = ["image/png", "image/jpeg"];

  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token,
    };
  });

  const addNewTravelPlans = async () => {
    // setImages(state.url);
    axios
      .post(
        `http://localhost:5000/travelPlans`,
        {
          title,
          start_date,
          finish_date,
          countries: prefenecesLocation,
          activities,
          requirements,
          details,
          images:state.url||"https://lh3.googleusercontent.com/proxy/zB-imYMtce4BvJYtDrRnOxmmpcwAjsXpGpJ85-aCYq70A9o4k2YwSb56Z1CAruHz7SPo0tIxdzSNKQG_FYYonQ5aoiQTvTXbSsDp_tjQSWbImeSTIdY",
          estimated_budget,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        axios
        .post(
          `http://localhost:5000/travelPlans/plan/${result.data.insertId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
        console.log("res", result.data);
        history.push("/plans");
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
  let minStartDate = moment(new Date(), "YYYY-MM-DD")
    .add(5, "days")
    .format("YYYY-MM-DD");
  let maxStartDate = moment(new Date(), "YYYY-MM-DD")
    .add(1, "y")
    .format("YYYY-MM-DD");
  let minFinishtDate = moment(start_date, "YYYY-MM-DD")
    .add(7, "d")
    .format("YYYY-MM-DD");
  let maxFinishDate = moment(start_date, "YYYY-MM-DD")
    .add(6, "months")
    .format("YYYY-MM-DD");

  return (
    <>
      <div className="form">
        <div className="input_cont">
          <label>Title : </label>
          <input
            type="text"
            className="input"
            placeholder="title here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input_cont">
          <label>Start Date : </label>
          <input
            className="input"
            type="date"
            min={minStartDate}
            max={maxStartDate}
            onChange={(e) => setStart_date(e.target.value)}
          />

          <label>Finish Date : </label>
          <input
            className="input"
            type="date"
            min={minFinishtDate}
            max={maxFinishDate}
            onChange={(e) => setFinish_date(e.target.value)}
          />
        </div>

        <div className="input_cont">
          <label>Travel Destinations : </label>
          <PerferencesLocation setPrefenecesLocation={setPrefenecesLocation} />
        </div>

        <div className="input_cont">
          <label>Details : </label>
          <textarea
            className="input"
            placeholder="Details"
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>

        <div className="input_cont">
          <label>Requirements : </label>
          <textarea
            className="input"
            placeholder="Requirements"
            onChange={(e) => setRequirements(e.target.value)}
          ></textarea>
        </div>

        <div className="input_cont">
          <label>Activities : </label>
          <textarea
            className="input"
            placeholder="Activities"
            onChange={(e) => setActivities(e.target.value)}
          ></textarea>
        </div>

        <div className="input_cont">
          <label>Image : </label>
          <input className="input" type="file" onChange={uploadImage} />
          {file && <LoaderBar file={file} setFile={setFile} />}
          {errorImgMessage && <div>{errorImgMessage}</div>}
        </div>

        <div className="input_cont">
          <label>Budget : </label>
          <input
            className="input"
            type="text"
            placeholder=" estimated budget here"
            onChange={(e) => setEstimated_budget(e.target.value)}
          />
        </div>

        <button className="button" onClick={addNewTravelPlans}>
          Create Travel Plans
        </button>
      </div>
    </>
  );
};

export default AddTravelPlans;
