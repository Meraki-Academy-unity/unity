import React, { useEffect, useState } from "react";
import { useHistory, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Matching = () => {
    const [matchLocation, SetMatchLocation] = useState("")
    const state = useSelector((state) => {
        return {
            url: state.imgUploader.url,
            token: state.login.token
        };
    });
    const matchByLocation = () => {
        axios.get("http://localhost:5000/preferences/locationMatch", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            SetMatchLocation(result.data)
        }).catch((err) => {
            console.log("error", err)
        })
    }
    useEffect(() => {
        matchByLocation()
    }, [])
    return (
        <>

            {matchLocation && matchLocation.map((elem, i) => {
                return <div key={i} style={{ border: "2px solid", margin: "10px" }}>
                    <img src={elem.profile_image} style={{ width: "100px" }} />
                    <p>{elem.first_name} {elem.last_name}</p>
                    <p>{elem.location}</p>
                    <p>{elem.activities}</p>

                </div>
            })}

        </>
    )


}
export default Matching
