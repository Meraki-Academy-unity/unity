import React, { useState, useEffect } from "react";
import axios from "axios";
import LoaderBar from "../loadingBar/loaderBar";
import { useSelector } from "react-redux";

const Album = () => {
  const [errorImgMessage, setErrorImgMessage] = useState();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();

  const types = ["image/png", "image/jpeg"];

  const state = useSelector((state) => {
    return {
      url: state.imgUploader.url,
      token: state.login.token,
    };
  });

  console.log("state url:", state.url);
  console.log("image :", image);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [image]);

  const uploadImage = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage && types.includes(selectedImage.type)) {
      setFile(selectedImage);
      setErrorImgMessage("");
    } else {
      setFile(null);
      setErrorImgMessage("please select image type of png or jpeg");
    }
  };

  return (
    <>
      {file && <LoaderBar file={file} setFile={setFile} />}
      <input type="file" onChange={uploadImage} />
      {errorImgMessage && <div>{errorImgMessage}</div>}
      <button
        onClick={() => {
          setImage(state.url);
        }}
      >
        Add Image
      </button>
    </>
  );
};

export default Album;
