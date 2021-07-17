import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import  ProfileUserActivities from "../usersProfile/userActivitiesProF";
import ProfileUserPlans from "../usersProfile/userPlansProf";
import GetUserPreferences from "../preferences/showUserPreference";
import ImageUserGrid from "../Album/showUserAlbum";
import Chat from "../chat/user";
import AddFriend from "./addFriend";
import axios from "axios";

const UserProfile = ({ setIsHome }) => {
  const [profile, setProfile] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [add, setAdd] = useState(false);
  const [plans, setPlans] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [pics, setPics] = useState(false);
  const [userActivities, setUserActivity] = useState(false);
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id
    };
  });
  setIsHome(false);
  useEffect(() => {
    axios
      .get(`/users/user/${id}`)
      .then((result) => {
        setProfile(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/friends/check/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        if (result.data.length) {
          setAdd(true);
        } else {
          setAdd(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [add]);

  const addFriend = () => {
    axios
      .post(
        `/friends/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        setAdd(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const removeFriend = () => {
    axios
      .delete(`/friends/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setAdd(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const userPlans = () => {
    setPlans(true);
    setPreferences(false);
    setPics(false);
    setUserActivity(false);
  };

  const userPreferences = () => {
    setPlans(false);
    setPreferences(true);
    setPics(false);
    setUserActivity(false);
  };

  const album = () => {
    setPlans(false);
    setPreferences(false);
    setPics(true);
    setUserActivity(false);
  };

  const userActivity = () => {
    setPlans(false);
    setPreferences(false);
    setPics(false);
    setUserActivity(true);
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
            <div className="profile-btn">
              { state.id && state.token ? <>
              <Link className="chat-btn" to={`/chat/${profile && profile.id}`}>
                {" "}
                <span id="msg">Message</span>
              </Link>
              {!add ? (
                <button className="chat-btn" onClick={addFriend}>
                  Add Friend{" "}
                </button>
              ) : (
                <button className="chat-btn" onClick={removeFriend}>
                  Remove
                </button>
              )}
              </> : ""}
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="nav">
            <ul>
              <li className="user-post" onClick={userActivity}>
                Acticities
              </li>
              <li className="user-post" onClick={userPlans}>
                Plans
                
              </li>
              <li className="user-post" onClick={userPreferences}>
                Preferences 
              </li>
              <li className="user-post" onClick={album}>
                Photo Album 
              </li>
            </ul>
          </div>
          <div class="profile-body">
            {plans ? (
              <div>
                <ProfileUserPlans id={id}/>
              </div>
            ) : (
              ""
            )}
            {preferences ? (
              <div>
                <GetUserPreferences id={id} />
              </div>
            ) : (
              ""
            )}

            {pics ? (
              <div>
                <ImageUserGrid id={id} />
              </div>
            ) : (
              ""
            )}
            {userActivities ? (
              <div>
                < ProfileUserActivities id={id}/>
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

export default UserProfile;
