import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import { Link, Route, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


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
            {preferences && preferences.map((elem, i) => {
                return (<div key={i}>
                    <p> loaction: {elem.location}</p>
                    <p>Date : from {moment(elem.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")} To {moment(elem.finish_date, "YYYY-MM-DD").format("DD-MM-YYYY")}</p>
                    <p>Activities: {elem.activities}</p>
                    <p>Same Gender: {elem.same_gender ? "Yes" : "No"}</p>
                    <p>Same Age: {elem.similar_age ? "Yes" : "No"}</p>
                </div>)
            })
            }
        </>
    )
};

export default GetUserPreferences;
