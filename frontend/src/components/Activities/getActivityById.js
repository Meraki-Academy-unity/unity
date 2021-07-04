import React, { useEffect, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link, Route } from "react-router-dom";
import AddComment from './addComment';
import DeleteComments from './deleteComment';
import UpdateComment from './updateComment';
import { useSelector } from 'react-redux';

import { act } from '@testing-library/react';

const GetActivityById = (id) => {
    const [comment, setComment] = useState([]);
    const [activity, setActivity] = useState("");
    const [show, setShow] = useState(false)
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });
    useEffect(async () => {
        await axios.get(`http://localhost:5000${id.location.pathname}`)
            .then((result) => {
                setActivity(result.data[0])
            })
            .catch((err) => {
                throw err;
            })




    }, [])
    if (activity) {
        axios.get(`http://localhost:5000/activities/comment/${activity.id}`).then((result) => {
            setComment(result.data)
        }).catch((err) => {
            throw err;
        })
    }

    return (<>
        <div >

            <div className="post">
                <img src={activity.images} className="postImg"></img>
                <h1>{activity.title}</h1>
                <p>location: {activity.location}</p>
                <p>start date: {activity.start_date}</p>
                <p>finish date: {activity.finish_date}</p>
                <p>details : {activity.details}</p>
                <p>requirements: {activity.requirements}</p>
                <p>activities: {activity.activities}</p>
                <p>estimated budget: {activity.estimated_budget}</p>
                <p>created by : <Link to={`/users/user/${activity.user_id}`}>{activity.first_name} {activity.last_name}</Link></p>
            </div>

            <div className="comment">
                {comment && comment.map((res, ind) => {
                    return <div key={ind} >
                        <img src={res.profile_image} style={{ width: "100px" }}></img>
                        <p>user : {res.first_name}</p>
                        <p>comment: {res.content}</p>
                        {state.token ? <DeleteComments comment_id={res.id} /> : ""}
                        <button onClick={() => setShow(!show)}>update</button>

                        {show ? <UpdateComment comment_id={res.id} /> : ""}
                    </div>
                })}

            </div>
            <AddComment activity_id={activity.id} />
        </div>

    </>)
}

export default GetActivityById