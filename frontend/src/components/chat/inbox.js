import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

const Inobx = () => {
  const [inbox, setInbox] = useState("");
  const [myData, setMyData] = useState("")
  const [userData, setUserData] = useState([])
  const [show, setShow] = useState(false)
  const newArr = [];
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      id: state.id.id
    };
  });

  const getMyInfo = () => {
    axios.get("http://localhost:5000/users/myProfile", {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
      .then((result) => {
        setMyData(result.data[0])
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getUserInfo = (id) => {
    axios
      .get(`http://localhost:5000/users/user/${id}`)
      .then((result) => {
        // if (userData.length <= inbox.length) {
        setUserData((userData) => [
          ...userData,
          result.data[0],
        ]);
        // setUserData([...userData],result.data[0])

        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(async () => {
  // console.log("roaa")
  getMyInfo();
  axios
    .get("http://localhost:5000/messages/", {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })
    .then((result) => {
      setInbox(result.data);
      for (let i = 0; i < result.data.length; i++) {
        if(result.data[i].sender_id!==state.id)
        getUserInfo(result.data[i].sender_id)
        else{
          getUserInfo(result.data[i]. receiver_id)
        }
      }
      
    })
    .catch((err) => {
      console.log(err);
    });

  }, [])




  console.log("7l deyaa m3 bayan", userData)
  console.log("7l deyaa m3 bayandd", myData)
  return (
    <div>
      <h1>Inbox</h1>
      {console.log("first",userData)}
      {inbox && inbox.map((elem, i) => {
        // { getUserInfo(elem.receiver_id) }
        return <div key={i}>
          {console.log("ind", i)}
          {elem.sender_id === state.id ? <>
            <img src={myData.profile_image} />
            <p>{myData.first_name}</p>
            sent to
            <img src={elem.profile_image} />
            <p>{elem.first_name}</p>
            <p>{elem.content}</p>
          </> : <>
            <img src={myData.profile_image} />
            <p>{myData.first_name}</p>
            recevied from
            <img src={userData[i] && userData[i].profile_image} />
            <p>{userData[i] && userData[i].first_name}</p>
            <p>{elem.content}</p>
          </>}
        </div>
      })}
    </div>
  );
};

export default Inobx;





