import React, { useState, useEffect } from "react";
import axios from "axios";
import LoaderBar from "../loadingBar/loaderBar";
import { useSelector } from "react-redux";


const ImageGrid = () => {
    const [photoAlbum, setPhotoAlbum] = useState([])
    const state = useSelector((state) => {
        return {
            token: state.login.token,
        };
    });


    useEffect(() => {

        axios.get("http://localhost:5000/photoAlbum/", {
            headers: {
                Authorization: `Bearer ${state.token}`,
            },
        })
            .then((result) => {
                console.log("album", result.data)
                setPhotoAlbum(result.data)
            })
            .catch((err) => {
                console.log("err in photo", err)
            })
    }, [photoAlbum])


    return (
        <>
            {photoAlbum && photoAlbum.map((elem, i) => {
                return <div key={i}>
                    <img src={elem.images} />
                </div>
            })}
        </>
    )


}
export default ImageGrid