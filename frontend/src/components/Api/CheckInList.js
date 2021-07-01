import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

const CheckInList = ({ setCheckInList }) => {
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
      <select
        name="image"
        id="image"
        onChange={(e) => {
          setLocation(e.target.value.split(",")[0]);
          setIndex(e.target.value.split(",")[1]);
        }}
      >
        <option>choose your country</option>
        {country &&
          country.map((elem, i) => {
            return (
              <option key={i} value={[elem.name, i]}>
                {elem.name}
              </option>
            );
          })}
      </select>
      {country[index] && setCheckInList(country[index].name)}
      {country[index] && (
        <img
          src={country[index].flag}
          style={{
            borderRadius: "50% ",
            width: "17px",
            height: "17px",
            borderStyle: "solid",
            borderWidth: "2px",
          }}
        />
      )}
    </>
  );
};

export default CheckInList;
