import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";



const ProfileUserPlans = () => {
    const [plansProf, setPlansProf] = useState([])
    const { id } = useParams();

    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });
    useEffect(() => {
        axios.get(`http://localhost:5000/travelPlans/all/user/${id}`)
            .then((result) => {
                setPlansProf(result.data)
                console.log(result.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    return (<>
        {plansProf && plansProf.map((res, ind) => {
            return (
                <div className="Activity">
                    <div className="leftAct">
                        <img src={res.profile_image} className="img"></img>
                        <p style={{ color: "blue", marginLeft: "10px" }}>
                            {res.first_name} {res.last_name}
                        </p>
                    </div>
                    <Link to={`/travelPlans/${res.id}`} key={ind}>
                        <div className="rightAct">
                            <h2 style={{ color: "#507fa4", fontWeight: "bolder" }}>
                                {res.title}
                            </h2>
                            <p className="p">location : {res.countries}</p>
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

export default ProfileUserPlans