import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPhoto } from "./../../reducers/photoAlbum";
import "./image.css"



const ImageGrid = () => {
    const [photoAlbum, setPhotoAlbum] = useState([])
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return {
            token: state.login.token,
            photo: state.photo.photo
        };
    });
    console.log("photo", state.photo)

    useEffect(() => {

        axios.get("http://localhost:5000/photoAlbum/", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            },
        })
            .then((result) => {
                setPhotoAlbum(result.data)
            })
            .catch((err) => {
                console.log("err in photo", err)
            })
    }, [])


    return (
        <>
            <div className="imageGrid">
                {photoAlbum && photoAlbum.map((elem, i) => {
                    return <div key={i}>
                        <img src={elem.images} onClick={() => {
                            dispatch(setPhoto(elem))

                        }} style={{ height: "300px", width: "300px" }} />
                    </div>

                })}
            </div>
        </>
    )


}
export default ImageGrid