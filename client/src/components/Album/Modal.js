import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhoto } from "./../../reducers/photoAlbum";
import "./image.css";

const Modal = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      photo: state.photo.photo,
    };
  });

  const imageClose = (e) => {
    if (e.target.classList.contains("backdrop")) {
      dispatch(setPhoto(""));
    }
  };

  return (
    <>
      <div className="backdrop" onClick={imageClose}>
        <img src={state.photo.images} alt="enlarged pic" />
      </div>
    </>
  );
};
export default Modal;
