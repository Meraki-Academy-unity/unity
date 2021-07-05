import React, { useEffect, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import AddTravelComment from './addComment';
import DeleteTravelComments from './deleteTravelComment';
import UpdateTravelComment from './updateTravelComment';
import "./../Activities/style.css"


const GetTravelById = (id) => {
    const [travel, setTravel] = useState("")
    const [comment, setComment] = useState("")
    const [show, setShow] = useState(false);

    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });

    useEffect(() => {
        axios.get(`http://localhost:5000${id.location.pathname}`)
            .then((result) => {
                setTravel(result.data[0])
            })
            .catch((err) => {
                throw err;
            })
    }, [])
    if (travel) {
        axios
            .get(`http://localhost:5000/travelPlans/comments/${travel.id}`)
            .then((result) => {
                setComment(result.data);
            })
            .catch((err) => {
                throw err;
            });
    }
    return (<>
        <div>

            <div className="post">
                <h1>{travel.title}</h1>
                <img src={travel.images} className="postImg"></img>
                <p>countries: {travel.countries}</p>
                <p>activities: {travel.activities}</p>
                <p>requirements: {travel.requirements}</p>
                <p>details : {travel.details}</p>
                <p>activities: {travel.activities}</p>
                <p>estimated budget: {travel.estimated_budget}</p>
                <p>
                    created by :{" "}
                    <Link to={`/users/user/${travel.user_id}`}>
                        {travel.first_name} {travel.last_name}
                    </Link>
                </p>
                <br />
            </div>

            <div className="comment">
                {comment &&
                    comment.map((res, ind) => {
                        return (
                            <div key={ind}>
                                <img src={res.profile_image} style={{ width: "100px" }}></img>
                                <p>user : {res.first_name}</p>
                                <p>comment: {res.content}</p>
                                {state.token ? <DeleteTravelComments comment_id={res.id} /> : ""}

                                {state.token ? (
                                    <button onClick={() => setShow(!show)}>update</button>
                                ) : (
                                    ""
                                )}
                                {show && state.token ? (
                                    <UpdateTravelComment comment_id={res.id} />
                                ) : (
                                    ""
                                )}
                            </div>
                        );
                    })}
            </div>
            {state.token ? <AddTravelComment travel_id={travel.id} /> : ""}

        </div>

    </>)
}

export default GetTravelById