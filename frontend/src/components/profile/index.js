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
import ProfilePlans from "./profilePlans";
import GetMyPreferences from "./../preferences/ShowPreference";
import ImageGrid from "./../Album/showAlbum";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [edit, setEdit] = useState(false);
  const [friends, setFriends] = useState(false);
  const [matches, setMatches] = useState(false);
  const [plans, setPlans] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [pics, setPics] = useState(false);
  const [ownActivity, setOwnActivity] = useState(false);

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
    setPlans(false);
    setPreferences(false);
    setPics(false);
    setOwnActivity(false);
  };

  const showFriends = () => {
    setEdit(false);
    setFriends(true);
    setMatches(false);
    setPlans(false);
    setPreferences(false);
    setPics(false);
    setOwnActivity(false);
  };

  const matching = () => {
    setEdit(false);
    setFriends(false);
    setMatches(true);
    setPlans(false);
    setPreferences(false);
    setPics(false);
    setOwnActivity(false);
  };

  const ownPlans = () => {
    setEdit(false);
    setFriends(false);
    setMatches(false);
    setPlans(true);
    setPreferences(false);
    setPics(false);
    setOwnActivity(false);
  };

  const ownPreferences = () => {
    setEdit(false);
    setFriends(false);
    setMatches(false);
    setPlans(false);
    setPreferences(true);
    setPics(false);
    setOwnActivity(false);
  };

  const album = () => {
    setEdit(false);
    setFriends(false);
    setMatches(false);
    setPlans(false);
    setPreferences(false);
    setPics(true);
    setOwnActivity(false);
  };

  const myActivity = () => {
    setEdit(false);
    setFriends(false);
    setMatches(false);
    setPlans(false);
    setPreferences(false);
    setPics(false);
    setOwnActivity(true);
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
          <div className="displayName">
            <span>{profile.display_name}</span>
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
            <p>Currently_in : {profile.currently_in}</p>
            <p>Gender : {profile.gender}</p>
            <p>Language : {profile.language}</p>
            <p>
              <i className="fas fa-user-edit"></i>
              <div className="Edit-buttons">
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
              <li className="user-post" onClick={ownPlans}>
                Posts
              </li>
              <li className="user-post" onClick={myActivity}>
                Activities
              </li>
              <li className="user-post" onClick={ownPreferences}>
                Preferences
              </li>
              <li className="user-post" onClick={album}>
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
            {plans ? (
              <div>
                <ProfilePlans />
              </div>
            ) : (
              ""
            )}
            {preferences ? (
              <div>
                <GetMyPreferences />
              </div>
            ) : (
              ""
            )}
            {pics ? (
              <div>
                <ImageGrid />
              </div>
            ) : (
              ""
            )}
            {ownActivity ? (
              <div>
                <ProfileActivities />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

{
  /* <Link to="/profile/info">Edit Profile</Link> 
<Link to="/profile/activities">My Acticities</Link> 
<Link to="/profile/plans">My Plans</Link> 
<Link to="/newsFeed">News Feed</Link> 
<Link to="/profile/preferences">Preferences</Link> 
<Link to="/profile/showFriend">Friends</Link>
<Link to="/match">Matching</Link> 
<Link to="/photoAlbum"> Photo Album</Link>  */
}
