import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";

const useStorage = (file) => {
  const [loader, setLoader] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    storageRef.put(file).on(
      "stateChange",
      (snap) => {
        let loading = (snap.bytesTransferred / snap.totalBytes) * 100;
        setLoader(loading);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file]);
  return { loader, error, url };
};

export default useStorage;
