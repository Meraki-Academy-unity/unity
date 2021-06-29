import React, { useEffect } from "react"
import useStorage from "../hooks/useStorage"
import "./loaderBar.css";

const LoaderBar = ({ file, setFile, setImg }) => {
    const { url, loader } = useStorage(file);
    console.log("URL ==> ",url, loader)
    useEffect(() => {
        if (url) {
            setFile(null)
        }
    }, [url])

    return (
        <div className="loaderBar" style={{ width: loader + "%" }}>

        </div>
    )

}
export default LoaderBar