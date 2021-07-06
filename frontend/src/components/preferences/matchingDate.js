import React, { useEffect, useState } from "react";
import { useHistory, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const MatchingDate = () => {
    const [matchDate, SetMatchDate] = useState("")
    const state = useSelector((state) => {
        return {
            url: state.imgUploader.url,
            token: state.login.token
        };
    });
    const matchByDate = () => {
        axios.get("http://localhost:5000/preferences/dateMatch", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            SetMatchDate(result.data)
        }).catch((err) => {
            console.log("error", err)
        })
    }
    useEffect(() => {
        matchByDate()
    }, [])
    return (
        <>

            {matchDate && matchDate.map((elem, i) => {
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
export default MatchingDate