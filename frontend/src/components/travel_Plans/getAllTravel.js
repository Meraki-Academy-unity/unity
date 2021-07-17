import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import moment from "moment";
import img from '../chat/notFound.png'
 
import PerferencesLocation from "../Api/perferencesLocation";

const GetAllTravel = ({setIsHome}) => {
  const [travels, setTravels] = useState([]);
  const [prefenecesLocation, setPrefenecesLocation] = useState();
  const [filterData, setFilterData] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);
  setIsHome(false)

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token,
      id: state.id.id,
    };
  });

  const history = useHistory();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/travelPlans`)
      .then((result) => {
        if (result.data.length){
          const arr = []
          let date = moment(new Date(), "YYYY-MM-DD")
          .format("YYYY-MM-DD");
          result.data.map((elem , i )=>{
            let startDate = moment(elem.start_date, "YYYY-MM-DD")
            .format("YYYY-MM-DD");
            let compare =moment(startDate).isAfter(date, 'days');
            if(compare){
              arr.push(elem)
            }
          })
        const sortedArray  = arr.sort((a,b) => new moment(a.start_date).format('YYYYMMDD') - new moment(b.start_date).format('YYYYMMDD'))
        setTravels(sortedArray);
        }
        else {
          setTravels(result.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [travels]);

  const filter = () => {
    const arr = [];
    travels &&
      travels.map((element, index) => {
        if (element.countries == prefenecesLocation) {
          arr.push(element);
        }
      });
    console.log(arr);
    setFilterData(arr);
  };

  return (
    <>
      {state.token ? (
        <>
          <button
            style={{ marginLeft: "95%", marginTop: "100px" }}
            onClick={() => {
              history.push("/addTravel");
            }}
            title="Create Travel Plan"
          >
            <IconContext.Provider
              value={{
                style: { fontSize: "35px", color: "rgb(232, 180, 48)" },
              }}
            >
              <FaPlus />
            </IconContext.Provider>
          </button>

          <div className="filter_page">
            <label>Choose Your Desired Travel Location :</label>
            <PerferencesLocation
              setPrefenecesLocation={setPrefenecesLocation}
            />
            <button
              className="interactionButton"
              onClick={() => {
                filter();
                setFilterStatus(true);
              }}
            >
              Filter
            </button>

            <button
              className="interactionButton"
              onClick={() => {
                setFilterStatus(false);
              }}
            >
              Reset Filter
            </button>
          </div>
        </>
      ) : (
        <div className="filter_page">
          <label>desired travel location :-</label>
          <PerferencesLocation setPrefenecesLocation={setPrefenecesLocation} />
          <button
            className="actionButton"
            onClick={() => {
              filter();
              setFilterStatus(true);
            }}
          >
            Filter
          </button>

          <button
            className="actionButton"
            onClick={() => {
              setFilterStatus(false);
            }}
          >
            Reset Filter
          </button>
        </div>
      )}
      {filterStatus ? (
        <>
          {!filterData.length ? (
            <div className="notFound">
            {" "}
            <img width="500px" src={img}/>
            </div>
          ) : (
            <div className="post_page">
              {filterData &&
                filterData.map((element, index) => {
                  return (
                    <div className="post_card" key={index}>
                      <div>
                        <img
                          className="poster_image"
                          src={element.images}
                          onClick={() => {
                            history.push(`travelPlans/${element.id}`);
                          }}
                        />
                      </div>
                      <div className="post_details">
                        <div className="uploader">
                          <img
                            src={element.profile_image}
                            className="img"
                          ></img>

                          {(state.id != element.user_id) && state.id? (
                            <Link
                              className="link"
                              to={`/users/user/${element.user_id}`}
                            >
                              <p style={{ color: "black" }}>
                                {element.first_name} {element.last_name}
                              </p>
                            </Link>
                          ) : (
                            <Link className="link" to={`/profile`}>
                              <p style={{ color: "black" }}>
                                {element.first_name} {element.last_name}
                              </p>
                            </Link>
                          )}
                        </div>

                        <div
                          className="post_info"
                          onClick={() => {
                            history.push(`travelPlans/${element.id}`);
                          }}
                        >
                          <h2
                            style={{
                              color: "rgb(232,180,48)",
                              fontWeight: "bold",
                            }}
                          >
                            {element.title}
                          </h2>
                          <p className="text">
                            Travel to : {element.countries}
                          </p>
                          <p className="text">
                            Start date :{" "}
                            {moment(element.start_date, "YYYY-MM-DD")
                              .add(1, "days")
                              .format("DD-MM-YYYY")}
                          </p>
                          <p className="text">
                            Finish date :{" "}
                            {moment(element.finish_date, "YYYY-MM-DD")
                              .add(1, "days")
                              .format("DD-MM-YYYY")}
                          </p>
                          <div style={{ display: "flex", gap: "116px" }}>
                            <p className="text">
                              Estimated budget : {element.estimated_budget} $
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </>
      ) : (
        <>
          {!travels.length ? (
            <div className="notFound">
            {" "}
            <img width="500px" src={img}/>
            </div>
          ) : (
            <div className="post_page">
              {travels &&
                travels.map((element, index) => {
                  return (
                    <div className="post_card" key={index}>
                      <div>
                        <img
                          className="poster_image"
                          src={element.images}
                          onClick={() => {
                            history.push(`travelPlans/${element.id}`);
                          }}
                        />
                      </div>
                      <div className="post_details">
                        <div className="uploader">
                          <img
                            src={element.profile_image}
                            className="img"
                          ></img>

                          {state.id != element.user_id ? (
                            <Link
                              className="link"
                              to={`/users/user/${element.user_id}`}
                            >
                              <p style={{ color: "black" }}>
                                {element.first_name} {element.last_name}
                              </p>
                            </Link>
                          ) : (
                            <Link className="link" to={`/profile`}>
                              <p style={{ color: "black" }}>
                                {element.first_name} {element.last_name}
                              </p>
                            </Link>
                          )}
                        </div>

                        <div
                          className="post_info"
                          onClick={() => {
                            history.push(`travelPlans/${element.id}`);
                          }}
                        >
                          <h2
                            style={{
                              color: "rgb(232,180,48)",
                              fontWeight: "bold",
                            }}
                          >
                            {element.title}
                          </h2>
                          <p className="text">
                            Travel to : {element.countries}
                          </p>
                          <p className="text">
                            Start date :{" "}
                            {moment(element.start_date, "YYYY-MM-DD")
                              .add(1, "days")
                              .format("DD-MM-YYYY")}
                          </p>
                          <p className="text">
                            Finish date :{" "}
                            {moment(element.finish_date, "YYYY-MM-DD")
                              .add(1, "days")
                              .format("DD-MM-YYYY")}
                          </p>
                          <div style={{ display: "flex", gap: "116px" }}>
                            <p className="text">
                              Estimated budget : {element.estimated_budget} $
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GetAllTravel;
