import React, { useEffect, useState } from "react";
import { useHistory, Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import axios from "axios";

const Matching = () => {
    const [stateMatch, setStateMatch] = useState("both")
    const [content, setContent] = useState([])
    const history = useHistory()
    const state = useSelector((state) => {
        return {
            url: state.imgUploader.url,
            token: state.login.token
        };
    });

    const matchByLoaction = () => {
        axios.get("http://localhost:5000/preferences/locationMatch", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            setContent(result.data)
        }).catch((err) => {
            console.log("error", err)
        })
    }

    const matchByDate = () => {
        axios.get("http://localhost:5000/preferences/dateMatch", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            setContent(result.data)
        }).catch((err) => {
            console.log("error", err)
        })
    }

    const matchByDateAndLocation = () => {
        axios.get("http://localhost:5000/preferences/match", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            setContent(result.data)
        }).catch((err) => {
            console.log("error", err)
        })
    }


    return (
        <>

            <button onClick={() => {
                setStateMatch("both")
            }}> Matching</button>
            <button onClick={() => {
                setStateMatch("location")
            }}> Match By location</button>

            <button onClick={() => {
                setStateMatch("date")
            }}> Match By Date</button>


            {stateMatch == "location" ?
                <>{matchByLoaction()}</> : ""}
            {stateMatch == "date" ?
                <>{matchByDate()}</> : ""}
            {stateMatch == "both" ?
                <>{matchByDateAndLocation()}</> : ""}

            {content && content.map((elem, i) => {
                return <div key={i} style={{ border: "2px solid", margin: "10px" }}>
                    <img src={elem.profile_image} style={{ width: "100px" }} />
                    {/* <Link to={`/users/user/${elem.id}`}> */}
                    <p onClick={() => { history.push(`/users/user/${elem.id}`) }}>User Name: {elem.first_name} {elem.last_name}</p>
                    {/* </Link> */}

                    <p>Date : from {moment(elem.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")} To {moment(elem.finish_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</p>
                    <p>location: {elem.location}</p>
                    <p>Activities: {elem.activities}</p>
                </div>
            })}

        </>

    )


}
export default Matching
