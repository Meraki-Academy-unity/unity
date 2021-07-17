import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const GetUserPreferences = () => {
    const [preferences, setPreferences] = useState([]);
    const { id } = useParams();
    const state = useSelector((state) => {
        return {
            token: state.login.token
        };
    });
    const history = useHistory()
    useEffect(() => {
        axios
            .get(`http://localhost:5000/preferences/user/${id}`)
            .then((result) => {
                setPreferences(result.data);
            })
            .catch((err) => {
                throw err;
            });
    }, []);

    return (
        <>
            {preferences.length == 0 ? <div><p> You dont have preferences please fill your preferences </p></div> :
                <div className="pref_page">
                    {preferences && preferences.map((elem, i) => {
                        return (<div key={i}>
                            <p>  Desired Travel Destinations :  {elem.location}</p>
                            <p> Availability Date : from {moment(elem.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")} &nbsp;to &nbsp;
                                {moment(elem.finish_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</p>
                            <p>Activities : {elem.activities}</p>
                            <p>Same Gender : {elem.same_gender ? "Yes" : "No"}</p>
                            <p>Same Age : {elem.similar_age ? "Yes" : "No"}</p>
                        </div>)
                    })
                    }
                </div>}
        </>
    )
};

export default GetUserPreferences;
