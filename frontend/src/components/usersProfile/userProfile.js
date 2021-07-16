import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, } from "react-router-dom";

import Chat from "../chat/user";
import AddFriend from "./addFriend";
import axios from "axios";


const UserProfile = ({setIsHome}) => {
    const [profile, setProfile] = useState([]);
    const [roomId, setRoomId] = useState("");
    const [add, setAdd] = useState(false)
    const { id } = useParams();
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });
    setIsHome(false)
    useEffect(()=>{
        axios
        .get(`http://localhost:5000/users/user/${id}`)
        .then((result) => {
            setProfile(result.data[0])
        })
        .catch((err) => {
            console.log(err);
        });
     },[])



    useEffect(() => {
    axios
        .get(`http://localhost:5000/friends/check/${id}`, {
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
     }, [add])



        
    const addFriend = () => {
        axios.post(`http://localhost:5000/friends/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            },
        }
        ).then((result) => {
            setAdd(true)
        }).catch((err) => {
            console.log("err", err)
        })
    }
    const removeFriend = () => {
        axios.delete(`http://localhost:5000/friends/${id}`, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            },
        }
        ).then((result) => {
            setAdd(false)
        }).catch((err) => {
            console.log("err", err)
        })
    }

    return (
        <div className="profileCont">
            <div className="profile">

                <div className="backImg"></div>
                <div className="profImage">
                    <img id="proImg" src={profile && profile.profile_image} />
                </div>
                <div className="displayName">
                    <p>{profile && profile.first_name}_{profile && profile.last_name}</p>
                    <small>Jordanian</small>
                    <div>
                        <div className="tabName">
                            <p>Tab</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="linksDiv">
            
                <Link to={`/chat/${profile && profile.id}`}>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                </svg></Link>
                {!add ? <button onClick={addFriend}>Add Friend </button> : <button onClick={removeFriend}>Remove Friend </button>}
                <Link to={`/ProfileUsers/activities/${profile && profile.id}`}>Acticities</Link>
                <Link to={`/ProfileUsers/plans/${profile && profile.id}`}>Plans</Link>
                <Link to={`/profileUser/preferences/${profile && profile.id}`}>Preferences </Link>
                <Link to={`/userphotoAlbum/${profile && profile.id}`}>Photo Album </Link>

            </div>

        </div>

    );
};

export default UserProfile;
