import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileActivities from "./profileActivities";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState([]);


  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });


useEffect(()=>{
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

},[])
    

  return (

    <div className="profileCont">
      <div className="profile">
        <div className="backImg"></div>
        <div className="profImage">
          <img id="proImg" src={profile.profile_image} />
        </div>
        <div className="displayName">
          <p>{profile.first_name}_{profile.last_name}</p>
          <small>Jordanian</small>
          <div>
            <div className="tabName">
              <p>Tab</p>
            </div>
          </div>
        </div>
      </div>
      <div className="linksDiv">
        <Link to="/profile/info">Edit Profile</Link>
        <Link to="/profile/activities">My Acticities</Link>
        <Link to="/profile/plans">My Plans</Link>
        <Link to="/newsFeed">News Feed</Link>
        <Link to="/profile/preferences">Preferences</Link>
        <Link to="/profile/showFriend">Friends</Link>
        <Link to="/match">Matching</Link>
        <Link to="/photoAlbum"> Photo Album</Link>


      </div>

    </div>

  );
};

export default Profile;
