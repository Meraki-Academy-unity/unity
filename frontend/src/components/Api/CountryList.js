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
  //GET https://translation.googleapis.com/language/translate/v2/languages
  useEffect(async () => {
    await axios
      .get(`https://translation.googleapis.com/language/translate/v2/languages`)
      .then((result) => {
        console.log("language", result.data);
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

export default CountryList;
