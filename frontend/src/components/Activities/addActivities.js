import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoaderBar from "../loadingBar/loaderBar";
import axios from "axios";
import moment from "moment";

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
  const [done, setDone] = useState(0);
  const types = ["image/png", "image/jpeg"];
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token,
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

  const AddNewActivities = () => {
    setDone(1);
    setImages(state.url);
    console.log("inf", done, "images: ", images);

    console.log("in", done, "images: ", images);
    axios
      .post(
        `http://localhost:5000/activities/`,
        {
          title,
          start_date,
          finish_date,
          details,
          requirements,
          activities,
          images:
            images ||
            "https://img.freepik.com/free-vector/people-doing-summer-sports_23-2148626870.jpg?size=626&ext=jpg",
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
        `http://localhost:5000/activities/activity/${result.data.insertId}`,
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
        history.push("/Activities");
      })
      .catch((err) => {
        throw err;
      });
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
            className="input"
            type="text"
            placeholder="title here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input_cont">
          <label>Start Date : </label>
          <input
            type="date"
            className="input"
            min={minStartDate}
            max={maxStartDate}
            onChange={(e) => setStart_date(e.target.value)}
          />
        </div>

        <div className="input_cont">
          <label>Finish Date : </label>
          <input
            type="date"
            min={minFinishtDate}
            className="input"
            max={maxFinishDate}
            onChange={(e) => setFinish_date(e.target.value)}
          />
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
          <input className="input" type="file" onChange={testUpload} />
        </div>
        {file && <LoaderBar file={file} setFile={setFile} />}
        {errorImgMessage && <div>{errorImgMessage}</div>}

        <div className="input_cont">
          <label>Budget : </label>
          <input
            className="input"
            type="text"
            placeholder=" estimated budget here"
            onChange={(e) => setEstimated_budget(e.target.value)}
          />
        </div>

        <div>
          <button className="button" onClick={AddNewActivities}>
            create activities
          </button>
        </div>
      </div>
    </>
  );
};

export default AddActivities;
