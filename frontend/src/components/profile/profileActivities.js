import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./profile.css";


const ProfileActivities = () => {
    const [activitiesProf, setActivitiesProf] = useState([])
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });
    useEffect(() => {
        axios.get(`http://localhost:5000/activities/myProfile`, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            setActivitiesProf(result.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (<>
        {activitiesProf && activitiesProf.map((res, ind) => {
            return (
                <div className="Activity">
                    <div className="leftAct">
                        <img src={res.profile_image} className="img"></img>
                        <p style={{ color: "blue", marginLeft: "10px" }}>
                            {res.first_name} {res.last_name}
                        </p>
                    </div>
                    <Link to={`/activities/activity/${res.id}`} key={ind}>
                        <div className="rightAct">
                            <h2 style={{ color: "#507fa4", fontWeight: "bolder" }}>
                                {res.title}
                            </h2>
                            <p className="p">location : {res.location}</p>
                            <p className="p">activities to do :{res.activities}</p>
                            <p className="p">start date : {res.start_date}</p>
                            <p className="p">finish date : {res.finish_date}</p>
                            <p className="p">
                                estimated budget : {res.estimated_budget}
                            </p>
                            <br />
                        </div>
                    </Link>
                </div>
            )
        })}
    </>)
}

export default ProfileActivities