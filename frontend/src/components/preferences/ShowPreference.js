import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import EditPerferences from "./EditPref";
import PerferencesLocation from "./../Api/perferencesLocation"
import { Link, Route } from "react-router-dom";
import "./../Activities/style.css";
import { useDispatch, useSelector } from "react-redux";

const GetMyPreferences = () => {
  const [preferences, setPreferences] = useState([]);
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [location, setLocation] = useState("");
  const [start_date, setStart_date] = useState("");
  const [finish_date, setFinish_date] = useState("");
  const [activities, setActivities] = useState("");
  const [similar_age, setSimilar_age] = useState(0);
  const [same_gender, setSame_gender] = useState(0);
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/preferences/user`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setPreferences(result.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const updatePreference = () => {
    console.log("tessst", location, start_date, finish_date,
      activities,
      similar_age,
      same_gender)
    axios.put("http://localhost:5000/preferences/", {
      location,
      start_date,
      finish_date,
      activities,
      similar_age,
      same_gender
    }, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    }).then((result) => {
      setEdit(false)
      console.log(result.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }
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
<div className="edit_page">
      {!edit ?
        <> {preferences.length == 0 ? <div><p> You dont have preferences please fill your preferences <button onClick={() => {
          setAdd(true)
        }}> Click here</button></p>
          {add ? <EditPerferences /> : ""}</div> : <div className="pref_page">
          {preferences &&
            preferences.map((elem, i) => {
              return (
                <div key={i}>
                  <p> Desired Travel Destinations : {elem.location}</p>
                  <p>
                    Availability Date : from{" "}
                    {moment(elem.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")}{" "}
                    to{" "}
                    {moment(elem.finish_date, "YYYY-MM-DD").format("DD-MM-YYYY")}
                  </p>
                  <p>Activities to do: {elem.activities}</p>
                  <p>Same Gender: {elem.same_gender ? "Yes" : "No"}</p>
                  <p>Same Age: {elem.similar_age ? "Yes" : "No"}</p>
                  <button className="interactionButton" onClick={() => {
                    setEdit(!edit)
                  }}>Edit</button>
                </div>
              );
            })}
        </div>} </>
        : <div className="edit_details">
          <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
                marginTop: "10px",
                padding: "0px",
              }}
            >
            Desired Travel Destinations :&nbsp; {" "}
            <PerferencesLocation setPrefenecesLocation={setLocation} />
          </div>
          <p>
            Start Date :{" "}
            <input
              type="date"
              min={minStartDate}
              max={maxStartDate}
              defaultValue={moment(preferences.start_date).format("YYYY-MM-DD")}
              onChange={(e) => {
                setStart_date(e.target.value);
              }}
            ></input>
          </p>
          <p>
            Finish Date :{" "}
            <input
              type="date"
              min={minFinishtDate}
              max={maxFinishDate}
              defaultValue={moment(preferences.finish_date).format("YYYY-MM-DD")}
              onChange={(e) => {
                setFinish_date(e.target.value);
              }}
            ></input>
          </p>
          <p>
            Activities :{" "}
            <input
              type={Text}
              defaultValue={preferences.activities}
              onChange={(e) => {
                setActivities(e.target.value);
              }}
            ></input>
          </p>
          <form>
            <div>
              <input 
                type="checkbox"
                onChange={() => {
                  setSame_gender(1);
                }}
              />
              <label style={{fontSize:"20px"}}> Same gender</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => {
                  setSimilar_age(1);
                }}
              />
              <label style={{fontSize:"20px"}}> Same Age</label>
            </div>
          </form>
          <button onClick={updatePreference} className="interactionButton">Save</button>
          <button
            className="interactionButton"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Cancel
          </button>
        </div>}

        </div>
    </>
  );
};

export default GetMyPreferences;
