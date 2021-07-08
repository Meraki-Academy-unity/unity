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
  const [currently_in, setCurrently_in] = useState("");
  const [birth_date, setBirth_date] = useState();
  const [gender, setGender] = useState("");
  const [checkInLis, setCheckInList] = useState();
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


  const updateProfile = ()=>{
      axios.put("http://localhost:5000/users/myProfile", {first_name , last_name ,currently_in:checkInLis ,birth_date, language , gender} , {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setEdit(false)
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <>
    <button onClick={()=>{setEdit(!edit)}}>Edit</button>
    {!edit ?
    <div>
      <p>First Name :- {profile.first_name}</p>
      <p>Last Name :- {profile.last_name}</p>
      <p>Email :- {profile.email}</p>
      <p>Region :- {profile.region}</p>
      <p>Currently In :- {profile.currently_in}</p>
      <p>Language :- {profile.language}</p>
      <p>Birth Of Date :- {moment(profile.birth_date).format("DD-MM-YYYY")}</p>
      <p>Gender :- {profile.gender}</p> 
      </div>
      : 
      <div>
      <p>First Name :- <input type = {Text} defaultValue={profile.first_name} onChange={(e)=>{setFirst_name(e.target.value)}}></input></p>
      <p>Last Name :- <input type = {Text} defaultValue={profile.last_name} onChange={(e)=>{setLast_name(e.target.value)}}></input></p>
      <p>Email :- {profile.email}</p>
      <p>Region :- {profile.region}</p>
      <p>Currently In :- <CheckInList setCheckInList={setCheckInList} />
              </p>
      <p>Language :- <input type = {Text} defaultValue={profile.language} onChange={(e)=>{setLanguage(e.target.value)}}></input></p>
      <p>Birth Of Date :- <input type="date" defaultValue={moment(profile.birth_date).format("YYYY-MM-DD")} onChange={(e)=>{setBirth_date(e.target.value)}}></input></p>

      <p>Gender :- {profile.gender === "Male" ? (
              <form>
                <div>
                  <input
                    onChange={() => {
                      setGender("Male");
                    }}
                    checked="checked"
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
              </form>) :(<form>
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
                    checked="checked"
                    name="Gender"
                    id="Female"
                    type="radio"
                    value="Female"
                  />
                  <label htmlFor="Female">Female</label>
                </div>
              </form>) }
              </p> 
              <button onClick={updateProfile}>Save</button>
      </div>  }
    </>
  );
};

export default EditMyProfile;
