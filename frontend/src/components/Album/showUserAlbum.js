import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPhoto } from "./../../reducers/photoAlbum";
import "./image.css";
import { useParams } from "react-router-dom";

const ImageUserGrid = () => {
  const [photoAlbum, setPhotoAlbum] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      photo: state.photo.photo,
    };
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/photoAlbum/${id}`)
      .then((result) => {
        setPhotoAlbum(result.data);
      })
      .catch((err) => {
        console.log("err in photo", err);
      });
  }, []);

  return (
    <>
      <div className="profileAlbum">
        {photoAlbum &&
          photoAlbum.map((elem, i) => {
            return (
              <div className="albumTab" key={i}>
                {elem.images && (
                  <img
                    src={elem.images}
                    onClick={() => {
                      dispatch(setPhoto(elem));
                    }}
                    style={{ height: "300px", width: "300px" }}
                  />
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ImageUserGrid;
