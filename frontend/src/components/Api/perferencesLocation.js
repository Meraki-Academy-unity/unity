import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

const PerferencesLocation = ({ setPrefenecesLocation }) => {
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
        }}
      >
        <select
          style={{ padding: "4px" }}
          name="image"
          id="image"
          onChange={(e) => {
            setLocation(e.target.value.split(",")[0]);
            setIndex(e.target.value.split(",")[1]);
          }}
        >
          <option>Choose Your Desired Travel Destinations</option>
          {country &&
            country.map((elem, i) => {
              return (
                <option key={i} value={[elem.name, i]}>
                  {elem.name}
                </option>
              );
            })}
        </select>
        {country[index] && setPrefenecesLocation(country[index].name)}
        {country[index] && (
          <img
            src={country[index].flag}
            style={{
              borderRadius: "50% ",
              width: "22px",
              height: "22px",
              borderStyle: "solid",
              borderWidth: "1px",
              marginLeft: "10px",
            }}
          />
        )}
      </div>
    </>
  );
};

export default PerferencesLocation;
