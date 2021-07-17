import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import img from '../chat/notFound.png'



const ShowFriends = () => {
    const [friend, setFriend] = useState("")
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });

    useEffect(() => {
        axios.get("/friends/", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            setFriend(result.data)
        }).catch((err) => {
            console.log("err", err)
        })
    }, [])

    return (<>{!friend.length ?(  <div className="notFound">
    {" "}
    <img width="500px" src={img}/>
        <p>No Friends to show</p>{" "}
      </div>) :
        <div className="friend_page" >
            {friend && friend.map((elem, i) => {
                return (
                    <div key={i} className="friend_card">
                        <img src={elem.profile_image} className="friend_img" />
                        <Link to={`/users/user/${elem.friend_id}`}>
                          <p> {elem.first_name} {elem.last_name} </p>
                        </Link>
                        {/* <p>{elem.first_name} {elem.last_name}</p> */}
                    </div>
                )
            })}
        </div>}
    </>)
}

export default ShowFriends