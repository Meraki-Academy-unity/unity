import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import Join from "./activityJoin";

const CheckTravelJoin = ({travel_id})=>{
    const [show , setShow] = useState(true)
    const [join, setJoin] = useState(false);
    const [members, setMembers] = useState([]);
    const state = useSelector((state) => {
        return {
          token: state.login.token,
        };
      });

    axios
      .get(`http://localhost:5000/travelPlans/member/${travel_id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        if (result.data.length) {
          setJoin(true);
        } else {
          setJoin(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

      const ShowMembers = async() => {
        setShow(false)
        await axios
        .get(`http://localhost:5000/travelPlans/members/${travel_id}` )
        .then((result) => {
            setMembers(result.data)
        })
        .catch((err) => {
          console.log("err", err);
        });
      }
      

      const AddMember = () => {
        axios
          .post(
            `http://localhost:5000/travelPlans/plan/${travel_id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
          )
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const DeleteMember = () => {
        axios
          .delete(
            `http://localhost:5000/travelPlans/plan/${travel_id}`,
            {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }
          )
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      return <>
      {!join ? (
        <button onClick={AddMember}>Join</button>
      ) : (
        <button onClick = {DeleteMember}>Leave</button>
      )}

      {show?<button onClick = {ShowMembers}>Show All Members</button> : <button onClick ={()=>{{setShow(true)} 
    {setMembers([])}}}>Hide Members</button>}

      {members && members.map((elem , ind )=>{ return <div key = {ind}>
            <img src={elem.profile_image} style={{width:"100px"}}></img>
            <Link to={`/users/user/${elem.id}`}>
            <p>{elem.first_name} {elem.last_name}</p>
            </Link>
            </div>
        })}
      </>
    }



export default CheckTravelJoin