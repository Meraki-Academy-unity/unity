import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./profile.css";


const ShowFriends = () => {
    const [friend, setFriend] = useState("")
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });

    useEffect(() => {
        axios.get("http://localhost:5000/friends/", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            setFriend(result.data)
        }).catch((err) => {
            console.log("err", err)
        })
    },[])

    return (<>
        {friend && friend.map((elem, i) => {
            return (
                <div key={i}>
                    <img src={elem.profile_image} />
                    <p>{elem.first_name} {elem.last_name}</p>

                </div>
            )
        })}
    </>)
}

export default ShowFriends