import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

const CountryList = ({ setCountryList }) => {
    const [country, setCountry] = useState([]);
    const [location, setLocation] = useState();
    const [index, setIndex] = useState();

    useEffect(async () => {
        await axios
            .get(`https://restcountries.eu/rest/v2/all`)
            .then((result) => {
                setCountry(result.data);
            })
            .catch((err) => {
                throw err;
            });
    }, []);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "10px",
                }}
            >
                <select
                 style={{ padding: "3px" ,width:"100%",fontSize:"18px"}}
                    name="image"
                    id="image"
                    onChange={(e) => {
                        setLocation(e.target.value.split(",")[0]);
                        setIndex(e.target.value.split(",")[1]);
                    }}
                >
                    <option>choose your Region</option>
                    {country &&
                        country.map((elem, i) => {
                            return (
                                <option key={i} value={[elem.name, i]}>
                                    {elem.name}
                                </option>
                            );
                        })}
                </select>
                {country[index] && setCountryList(country[index].name)}
                {country[index] && (
                    <img
                        src={country[index].flag}
                        style={{
                            borderRadius: "50% ",
                            width: "22px",
                            height: "22px",
                            borderStyle: "solid",
                            borderWidth: "1px",
                            marginLeft: "5px",
                            marginTop:"4px"
                          }}
                    />
                )}
            </div>
        </>
    );
};

export default CountryList;
