import React, { useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { motion } from "framer-motion";
import { Container } from "@material-ui/core";

function ProgressBar({ file, setFile, setImages, Images, updateImages }) {
  const { Url, Progress } = useStorage(file);

  useEffect(() => {
    if (Url) {
      setImages([...Images, Url]);
      updateImages([...Images, Url]);
      setFile(null);
    }
  }, [Url, setFile]);

  return (
    <Container maxWidth="sm">
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: Progress + "%" }}
      ></motion.div>
    </Container>
  );
}

export default ProgressBar;
