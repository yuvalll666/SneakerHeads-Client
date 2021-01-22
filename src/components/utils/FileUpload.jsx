import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import http from "../../services/httpService";
import { useToasts } from "react-toast-notifications";
import { localUrl, apiUrl } from "../../config.json";
import { projectStorage, db } from "../../firebase/config";
import ProgressBar from "./ProgressBar";

/**
 * Component - FileUpload
 * @component
 * @param {Object} props - containes oldImages and updateImages
 */
function FileUpload(props) {
  // const [ImageUrls, setImageUrls] = useState([]);
  const oldProductId = props.productId;
  const [File, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const { addToast } = useToasts();
  // Coming from updateImages component
  let oldImages = props.oldImages;

  useEffect(() => {
    if (oldImages && oldImages.length >= 1) {
      setImages(oldImages);
    }
  }, [props.oldImages]);

  /**
   * Send request to server to add image file to /public/uploads dir
   * @param {Array.<Object>} files - Array of one image information
   */
  const types = ["image/png", "image/jpeg"];

  const onDrop = async (files) => {
    let selected = files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      return addToast("Please select an image file (png or jpeg)", {
        appearance: "error",
      });
    }
  };

  const firebaseDelete = async (image) => {
    const dbRef = await db.collection("images");
    const file = await dbRef.where("url", "==", image);

    let docId;
    let data;
    await file.get().then((snap) => {
      snap.forEach((doc) => {
        docId = doc.id;
        data = doc.data();
      });
    });
    const storageRef = projectStorage.ref();
    const imageRef = storageRef.child(data.fileName);

    imageRef
      .delete()
      .then(() => {
        console.log("Deleted from storage");
      })
      .catch((err) => {
        console.log("Failed storage", err);
      });

    dbRef
      .doc(docId)
      .delete()
      .then(() => {
        console.log("Deleted Frome Store");
      })
      .catch((err) => {
        console.log("Failed store", err);
      });
  };

  /**
   * Delete file on click (create product)
   * @param {String} image - Image File path
   */
  const handleDelete = async (image) => {
    if (oldImages) {
      http.post(`${apiUrl}/products/oldImagesDelete`, { image, oldProductId });
    }
    firebaseDelete(image);

    const currentIndex = images.indexOf(image);

    let newImages = [...images];
    // Remove image file from newImages Array
    newImages.splice(currentIndex, 1);
    setImages(newImages);

    // Pass images to father component
    props.updateImages(newImages);
  };

  return (
    <div>
      <div className="container d-lg-flex justify-content-center">
        <div className="row justify-content-center">
          <div className="mr-4 mb-2 ">
            <Dropzone onDrop={onDrop} multiple={true} maxSize={80000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgrey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <i className="fas fa-plus" style={{ fontSize: "4rem" }}></i>
                </div>
              )}
            </Dropzone>
          </div>

          <div
            style={{
              display: "flex",
              width: "351px",
              height: "241px",
              overflowX: "auto",
              overflowY: "hidden",
              border: "1px solid lightgrey",
            }}
          >
            {images.map((image, index) => (
              <div onClick={() => handleDelete(image)} key={index}>
                <img
                  style={{ minWidth: "300px", width: "300px", height: "240px" }}
                  src={image}
                  alt={`productImg-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {File && (
        <ProgressBar
          file={File}
          setFile={setFile}
          Images={images}
          setImages={setImages}
          updateImages={props.updateImages}
        />
      )}
    </div>
  );
}

export default FileUpload;
