import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import './profile.css'


const Profile=()=>{
    const [profile,setProfile] = useState([]);
    const [user_id,setUserId] = useState(-1);
    const [DisplayName,setDisplayName] = useState(-1);
    const [ProfileImg,setProfileImg] = useState(-1);
    const state = useSelector((state) => {
      return {
        token: state.login.token,
      };
    });

    useEffect(getProfile,[])


    function getProfile() {
        axios
          .get("http://localhost:5000/users/myProfile", {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          })
          .then((result) => {
            setProfile(result.data);
            setUserId(result.data[0].id)
            setDisplayName(result.data[0].first_name+"_"+result.data[0].last_name)
            setProfileImg(result.data[0].profile_image)
          })
          .catch((err) => {
            console.log(err);
          });
      }

    return (

        <div className="profileCont">
          <div className="profile">
            <div className="backImg"></div>
          <div className="profImage">
            <img id ="proImg" src={ProfileImg}/>
          </div>
          <div className="displayName">
            <p>{DisplayName}</p>
            <small>Jordanian</small>
            </div>
          </div>
        </div>
    )
}

export default Profile;