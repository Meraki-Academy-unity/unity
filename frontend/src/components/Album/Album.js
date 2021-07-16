import React, { useState, useEffect } from "react";
import axios from "axios";
import LoaderBar from "../loadingBar/loaderBar";
import { useSelector } from "react-redux";

const Album = () => {
  const [errorImgMessage, setErrorImgMessage] = useState();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const [done, setDone] = useState(false);

  const types = ["image/png", "image/jpeg"];

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token,
    };
  });

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/photoAlbum/",
        {
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        setDone(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [image]);

  const uploadImage = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage && types.includes(selectedImage.type)) {
      console.log(selectedImage);
      setFile(selectedImage);
      setDone(true);
      setErrorImgMessage("");
    } else {
      setFile(null);
      setErrorImgMessage("please select image type of png or jpeg");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          fontSize: "20px",
          marginTop: "30px",
          marginLeft: "30px",
        }}
      >
        <input
          style={{ fontSize: "20px" }}
          type="file"
          onChange={uploadImage}
        />
        {file && <LoaderBar file={file} setFile={setFile} />}
        {errorImgMessage && <div>{errorImgMessage}</div>}
        {!file && done ? (
          <button
            style={{ fontSize: "20px" }}
            onClick={() => {
              setImage(state.url);
            }}
          >
            &nbsp;Add Image &nbsp;
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Album;
