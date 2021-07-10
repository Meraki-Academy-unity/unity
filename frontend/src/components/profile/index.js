import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileActivities from "./profileActivities";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [user_id, setUserId] = useState(-1);
  const [DisplayName, setDisplayName] = useState("User Name");
  const [ProfileImg, setProfileImg] = useState(-1);

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  // useEffect(getProfile, []);

  function getProfile() {
    axios
      .get("http://localhost:5000/users/myProfile", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setProfile(result.data);
        setUserId(result.data[0].id);
        setDisplayName(
          result.data[0].first_name + "_" + result.data[0].last_name
        );
        setProfileImg(result.data[0].profile_image);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <div className="profileCont">
      {getProfile()}
      <div className="profile">
        <div className="backImg"></div>
        <div className="profImage">
          <img id="proImg" src={ProfileImg} />
        </div>
        <div className="displayName">
          <p>{DisplayName}</p>
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
