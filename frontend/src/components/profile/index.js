import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProfileActivities from "./profileActivities";
import axios from "axios";
import "./profile.css";
import moment from "moment";
import EditMyProfile from "./editProfile";
import ShowFriends from "./showFriend";
import Matching from "./../preferences/matching";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [edit, setEdit] = useState(false);
  const [friends, setFriends] = useState(false);
  const [matches, setMatches] = useState(false);
  const history = useHistory();
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
  }, []);

  const editProfile = () => {
    setEdit(true);
    setFriends(false);
    setMatches(false);
  };

  const showFriends = () => {
    setEdit(false);
    setFriends(true);
    setMatches(false);
  };

  const matching = () => {
    setEdit(false);
    setFriends(false);
    setMatches(true);
  };

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-img">
          <img src={profile.profile_image} />
        </div>
        <div className="profile-nav-info">
          <h3 className="user-name">
            {profile.first_name} {profile.last_name}
          </h3>
          <div className="address">
            <span className="country">{profile.currently_in}</span>
          </div>
          {/* <div class="profile-option">
            <div className="Follow">
              <i className="fas fa-user-plus"></i>
            </div>
          </div> */}
        </div>
      </div>
      <div className="main-bd">
        <div className="left-side">
          <div className="profile-side">
            <p className="email">
              <i className="fa fa-envelope"></i>
              Name : {profile.first_name} {profile.last_name}
            </p>

            <p>Place of birth : {profile.region}</p>
            <p>
              Date of birth : &nbsp;
              {moment(profile.birth_date, "YYYY-MM-DD")
                .add(1, "days")
                .format("DD-MM-YYYY")}
            </p>
            <p>Gender : {profile.gender}</p>
            <p>Language : {profile.language}</p>
            <p>
              <i className="fas fa-user-edit"></i>
              <div>
                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.3)",
                  }}
                >
                  <button
                    className="edit"
                    onClick={editProfile}
                    style={{ marginTop: "20px" }}
                  >
                    Edit Profile
                  </button>
                </div>
                <div>
                  <button className="edit" onClick={showFriends}>
                    Friends
                  </button>
                </div>
                <div>
                  <button className="edit" onClick={matching}>
                    Matching
                  </button>
                </div>
              </div>
            </p>
          </div>
          {/* <div className="profile-btn">
            <button className="chat-btn">
              <i className="fa fa-comment"></i>chat
            </button>
            <button className="createbtn">
              <i className="fa fa-plus"></i>create
            </button>
          </div> */}
        </div>

        <div className="right-side">
          <div className="nav">
            <ul>
              <li
                className="user-post"
                onClick={(e) => history.push("/profile/plans")}
              >
                Posts
              </li>
              <li
                className="user-post"
                onClick={(e) => history.push("/profile/activities")}
              >
                Activities
              </li>
              <li
                className="user-post"
                onClick={(e) => history.push("/profile/preferences")}
              >
                Preferences
              </li>
              <li
                className="user-post"
                onClick={(e) => history.push("/photoAlbum")}
              >
                Photos
              </li>
            </ul>
          </div>
          <div class="profile-body">
            {edit ? (
              <div>
                <EditMyProfile />
              </div>
            ) : (
              ""
            )}
            {friends ? (
              <div>
                <ShowFriends />
              </div>
            ) : (
              ""
            )}
            {matches ? (
              <div>
                <Matching />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* <Link to="/profile/info">Edit Profile</Link> */}
        {/* <Link to="/profile/activities">My Acticities</Link> */}
        {/* <Link to="/profile/plans">My Plans</Link> */}
        {/* <Link to="/newsFeed">News Feed</Link> */}
        {/* <Link to="/profile/preferences">Preferences</Link> */}
        {/* <Link to="/profile/showFriend">Friends</Link>
        <Link to="/match">Matching</Link> */}
        {/* <Link to="/photoAlbum"> Photo Album</Link> */}
      </div>
    </div>
  );
};

export default Profile;
