import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LoaderBar from "../../loadingBar/loaderBar";

import {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../../reducers/signUp";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [region, setRegion] = useState();
  const [currentlyIn, setCurrentlyIn] = useState();
  const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [language, setLanguage] = useState();
  const [profileImage, setProfileImage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [id, setId] = useState();
  const [secondStep, setSecondStep] = useState(false);
  const [errorImgMessage, setErrorImgMessage] = useState()
  const [file, setFile] = useState(null)

  const types = ["image/png", "image/jpeg"]


  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url
    };
  });
  console.log("state", state)

  const signUpFirstStep = () => {

    if (password === confirmPassword) {
      axios
        .post("http://localhost:5000/signUp/firstStep", {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        })
        .then((result) => {
          setId(result.data.id);
          setSecondStep(true);
        })
        .catch((err) => {
          throw err;
        });
    } else {
      setErrorMessage("Password Does Not Match");
    }
  };

  const signUpSecondStep = () => {
    setProfileImage(state.url)
    axios
      .put(`http://localhost:5000/signUp/secondStep/${id}`, {
        region,
        currently_in: currentlyIn,
        language,
        gender,
        birth_date: dateOfBirth,
        profile_image: profileImage,
        display_name: displayName,
      })
      .then((result) => {
        //   perfernces
      })
      .catch((err) => {
        throw err;
      });
  };
  const testUpload = (e) => {

    // console.log("test image uploade")
    let selectedImage = e.target.files[0];
    //console.log("select", selectedImage);
    if (selectedImage && types.includes(selectedImage.type)) {
      setFile(selectedImage)
      setErrorImgMessage("")

    }
    else {
      setFile(null)
      setErrorImgMessage("please select image type of png or jpeg")
    }
  }
  return (
    <>
      {!secondStep ? (
        <div>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="Enter First Name Here"
          />
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="Enter Last Name Here"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter E-mail Here"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter Password Here"
          />
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            type="password"
            placeholder="Re-Enter Password Here"
          />

          <button onClick={signUpFirstStep}>Sign-Up</button>
        </div>
      ) : (
        <div>
          <input
            onChange={(e) => {
              setRegion(e.target.value);
            }}
            type="text"
            placeholder="Enter Your Country Here"
            defaultValue=""
          />
          <input
            onChange={(e) => {
              setCurrentlyIn(e.target.value);
            }}
            type="text"
            placeholder="Check In Your Current Location Here"
            defaultValue=""
          />
          <input
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            type="text"
            placeholder="Enter The Languages That you speak Here"
            defaultValue=""
          />
          <form>
            <input
              onChange={() => {
                setGender("Male");
              }}
              name="Gender"
              id="Male"
              type="radio"
              value="Male"
            />
            <label htmlFor="Male">Male</label>
            <input
              onChange={() => {
                setGender("Female");
              }}
              name="Gender"
              id="Female"
              type="radio"
              value="Female"
            />
            <label htmlFor="Female">Female</label>
          </form>
          <input
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
            type="date"
            placeholder="mm-dd-yyyy"
          />
          {/* <input
            onChange={(e) => {
              setProfileImage(e.target.value);
            }}
            type="text"
            placeholder="image here"
          /> */}
          {/* {file && <h1>{file.name}</h1>} */}
          {file && <LoaderBar file={file} setFile={setFile} />}
          <input type='file' onChange={testUpload} />
          {errorImgMessage && <div>{errorImgMessage}</div>}



          <input
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            type="text"
            placeholder="Enter Display Name Here"
          />
          <button onClick={signUpSecondStep}>Next</button>
        </div>
      )}
    </>
  );
};

export default SignUp;
