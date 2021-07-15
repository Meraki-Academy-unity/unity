import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link ,useHistory} from "react-router-dom";
import axios from "axios";
import "./profile.css";
import moment from "moment";


const ProfilePlans = () => {
    const [plansProf, setPlansProf] = useState([])
    const history=useHistory()
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });
    useEffect(() => {
        axios.get(`http://localhost:5000/travelPlans/profile/plans`, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            setPlansProf(result.data)
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (<>
        {plansProf && plansProf.map((res, ind) => {
            return (
                <div className="post_page">
                    <div className="post_card">
                        <div>
                            <img
                                className="poster_image"
                                src={res.images}
                                onClick={() => {
                                    history.push(`/travelPlans/${res.id}`);
                                }}
                            />
                        </div>
                        <div className="post_details">
                            <div className="uploader">
                                <img src={res.profile_image} className="img"></img>
                                <p style={{ color: "black" }}>
                                    {res.first_name} {res.last_name}
                                </p>
                            </div>

                            {/* <Link to={`/travelPlans/${res.id}`} key={ind}> */}
                            <div className="post_info"
                                onClick={() => {
                                    history.push(`/travelPlans/${res.id}`);
                                }}>
                                <h2 style={{ color: "#507fa4", fontWeight: "bolder" }}>
                                    {res.title}
                                </h2>
                                <p className="text">location : {res.countries}</p>
                                <p className="text">activities to do :{res.activities}</p>
                                <p className="text">
                                    Start date :{" "}
                                    {moment(res.start_date, "YYYY-MM-DD")
                                        .add(1, "days")
                                        .format("DD-MM-YYYY")}
                                </p>
                                <p className="text">
                                    Finish date :{" "}
                                    {moment(res.finish_date, "YYYY-MM-DD")
                                        .add(1, "days")
                                        .format("DD-MM-YYYY")}
                                </p>
                                <p className="text">
                                    estimated budget : {res.estimated_budget}
                                </p>
                                <br />
                            </div>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            )
        })}
    </>)
}

export default ProfilePlans