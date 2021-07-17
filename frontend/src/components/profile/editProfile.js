import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import CheckInList from "../Api/CheckInList";
import "./profile.css";

const EditMyProfile = () => {
  const [profile, setProfile] = useState([]);
  const [edit, setEdit] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [language, setLanguage] = useState("");
  const [birth_date, setBirth_date] = useState();
  const [gender, setGender] = useState("");
  const [checkInList, setCheckInList] = useState();

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/myProfile", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setProfile(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profile]);

  const updateProfile = () => {
    axios
      .put(
        "http://localhost:5000/users/myProfile",
        {
          first_name,
          last_name,
          currently_in: checkInList,
          birth_date,
          language,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        setEdit(false);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editProfile = () => {
    setEdit(!edit);
    // setFirst_name(profile.first_name);
    // setLast_name(profile.last_name);
    // setLanguage(profile.language);
    // setBirth_date(profile.birth_date);
    // setGender(profile.gender);
    // setCheckInList(profile.currently_in);
  };

  return (
    <>
      <div className="edit_page">
        {!edit ? (
          <div>
            <p>First Name : {profile.first_name}</p>
            <p>Last Name : {profile.last_name}</p>
            <p>Email : {profile.email}</p>
            <p>Place of birth : {profile.region}</p>
            <p>
              Date of birth : {moment(profile.birth_date).format("DD-MM-YYYY")}
            </p>
            <p>Currently In : {profile.currently_in}</p>
            <p>Language : {profile.language}</p>
            <p>Gender : {profile.gender}</p>
            <button classname="interactionButton" onClick={editProfile}>
              Edit
            </button>
          </div>
        ) : (
          <div className="edit_details">
            <p>
              First Name :{" "}
              <input
                type={Text}
                defaultValue={profile.first_name}
                onChange={(e) => {
                  setFirst_name(e.target.value);
                }}
              ></input>
            </p>
            <p>
              Last Name :{" "}
              <input
                type={Text}
                defaultValue={profile.last_name}
                onChange={(e) => {
                  setLast_name(e.target.value);
                }}
              ></input>
            </p>
            <p>Email : {profile.email}</p>
            <p>Place of birth : {profile.region}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
                marginTop: "10px",
                padding: "0px",
              }}
            >
              Currently In :&nbsp;{" "}
              <CheckInList setCheckInList={setCheckInList} />
            </div>
            <p>
              Language :{" "}
              <input
                type={Text}
                defaultValue={profile.language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
              ></input>
            </p>
            <p>
              Date of birth :{" "}
              <input
                type="date"
                defaultValue={moment(profile.birth_date).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setBirth_date(e.target.value);
                }}
              ></input>
            </p>

            <p>
              Gender :{" "}
              {profile.gender === "Male" ? (
                <form>
                  <div>
                    <input
                      onChange={() => {
                        setGender("Male");
                      }}
                      name="Gender"
                      id="Male"
                      type="radio"
                      value="Male"
                    />
                    <label htmlFor="Male">Male</label>
                  </div>
                  <div>
                    <input
                      onChange={() => {
                        setGender("Female");
                      }}
                      name="Gender"
                      id="Female"
                      type="radio"
                      value="Female"
                    />
                    <label htmlFor="Female">Female</label>
                  </div>
                </form>
              ) : (
                <div className="form_gender">
                  <form>
                    <input
                      onChange={() => {
                        setGender("Male");
                      }}
                      name="Gender"
                      id="Male"
                      type="radio"
                      value="Male"
                    />
                    <label htmlFor="Male">Male</label>

                    <input
                      onChange={() => {
                        setGender("Female");
                      }}
                      name="Gender"
                      id="Female"
                      type="radio"
                      value="Female"
                    />
                    <label htmlFor="Female">Female</label>
                  </form>
                </div>
              )}
            </p>
            <button onClick={updateProfile}>Save</button>
            <button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EditMyProfile;
