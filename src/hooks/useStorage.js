import React, { useEffect, useState } from "react";
import { db, projectStorage, timestamp } from "../firebase/config";

function useStorage(file) {
  const [Progress, setProgress] = useState(0);
  const [Url, setUrl] = useState(null);
  const [Error, setError] = useState(null);

  useEffect(() => {
    // references
    const newName = Date.now() + "_" + file.name;
    const storageRef = projectStorage.ref(newName);
    const collectionRef = db.collection("images");
    storageRef.put(file).on(
      "state_change",
      (snap) => {
        let precentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(precentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        const fileName = newName;
        collectionRef.add({ url, createdAt, fileName });
        setUrl(url);
      }
    );
  }, [file]);

  return { Progress, Url, Error };
}

export default useStorage;
