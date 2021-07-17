import React, { useEffect, useState } from "react";
import { useHistory, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PerferencesLocation from "../Api/perferencesLocation";
import moment from "moment";
import "./Perferences.css";
import "./signUp.css";
import axios from "axios";
import img from "./pref.png";

const EditPerferences = () => {
  const [location, setLocation] = useState("");
  const [start_date, setStart_date] = useState("");
  const [finish_date, setFinish_date] = useState("");
  const [activities, setActivities] = useState("");
  const [similar_age, setSimilar_age] = useState(0);
  const [same_gender, setSame_gender] = useState(0);
  const [prefenecesLocation, setPrefenecesLocation] = useState("");
  const [done, setDone] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      id: state.id.id,
    };
  });
  console.log("id state", state.id);

  useEffect(() => {
    axios
      .post(`/preferences/`, {
        location,
        start_date,
        finish_date,
        activities,
        similar_age,
        same_gender,
        user_id: state.id,
      })
      .then((result) => {
        console.log("res", result.data);
        setSame_gender(0);
        setSimilar_age(0);
        window.location.reload();
      })
      .catch((err) => {
        throw err;
      });
  }, [done]);

  const addNewPerferences = () => {
    setLocation(prefenecesLocation);
    setDone(!done);
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
      <div className="regCont" style={{background:"none"}}>
        <div className="rightAuthReg">
          <div className="regWrapper">
            <div className="regForm">
              <div className="email">
                <label>desired travel location : </label>
                <PerferencesLocation
                  setPrefenecesLocation={setPrefenecesLocation}
                />
                {prefenecesLocation}
              </div>
              <div className="firstName">
                <label>Start Date : </label>
                <input
                  type="date"
                  min={minStartDate}
                  max={maxStartDate}
                  onChange={(e) => setStart_date(e.target.value)}
                />
              </div>
              <div className="lastName">
                <label>Finish Date : </label>
                <input
                  type="date"
                  min={minFinishtDate}
                  max={maxFinishDate}
                  onChange={(e) => setFinish_date(e.target.value)}
                />
              </div>
              <div className="firstName">
                <label>Activities : </label>
                <textarea
                  style={{ resize: "none" }}
                  onChange={(e) => setActivities(e.target.value)}
                  placeholder="activities here"
                ></textarea>
              </div>
              <div className="lastName">
                <form>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => {
                        setSame_gender(1);
                      }}
                    />
                    <label> same gender</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => {
                        setSimilar_age(1);
                      }}
                    />
                    <label> same Age</label>
                  </div>
                </form>
              </div>
              <div className="createAccount">
                <button onClick={addNewPerferences}>create Perferences</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPerferences;
