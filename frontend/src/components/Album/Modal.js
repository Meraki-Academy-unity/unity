import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhoto } from "./../../reducers/photoAlbum";
import "./image.css"


const Modal = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => {
        return {
            photo: state.photo.photo
        };
    });
    console.log("photoMODAL", state.photo)

    const imageClose = (e) => {
        dispatch(setPhoto(""))
    }


    return (
        <>
            <div className="backdrop">
                <img src={state.photo.images} alt="enlarged pic" onClick={imageClose} />
            </div>
        </>
    )
}
export default Modal