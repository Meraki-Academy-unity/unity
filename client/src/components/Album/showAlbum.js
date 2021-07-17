import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Album from "./Album";
import { setPhoto } from "./../../reducers/photoAlbum";
import "./image.css";

const ImageGrid = () => {
  const [photoAlbum, setPhotoAlbum] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      photo: state.photo.photo,
    };
  });

  useEffect(() => {
    axios
      .get("/photoAlbum/", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setPhotoAlbum(result.data);
      })
      .catch((err) => {
        console.log("err in photo", err);
      });
  }, [photoAlbum || state.token]);

  return (
    <>
      <div className="profileAlbum">
        <>
          {" "}
          <Album />{" "}
        </>

        {photoAlbum &&
          photoAlbum.map((elem, i) => {
            return (
              <div className="albumTab">
                <div className="pic" key={i}>
                  {elem.images && (
                    <img
                      src={elem.images}
                      onClick={() => {
                        dispatch(setPhoto(elem));
                      }}
                      style={{ height: "400px", width: "400px" }}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ImageGrid;
