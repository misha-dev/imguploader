import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { TbFileUpload } from "react-icons/tb";
import { v4 } from "uuid";
import { storage } from "../../firebase/config";
import cl from "./ImageUploader.module.css";
export const ImageUploader = () => {
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState();
  const [url, setUrl] = useState("");
  const imageRef = useRef();
  const storageImgRef = ref(storage, `/imgs/${v4()}`);

  const uploadToHTML = () => {
    // @ts-ignore
    const file = imageRef.current.files[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        const result = reader.result;
        // @ts-ignore
        imageRef.current.value = "";
        // @ts-ignore
        setImg(result);
      });
    }
  };

  const uploadToStorage = () => {
    // @ts-ignore
    uploadBytes(storageImgRef, imgFile).then((response) => {
      getDownloadURL(response.ref).then((url) => {
        setUrl(url);
      });
    });
    // @ts-ignore
    imageRef.current.value = "";
    setImg("");

    setImgFile(undefined);
  };
  return (
    <div className={cl.uploaderWrapper}>
      <div className={cl.imgWrapper}>
        {img !== "" ? (
          <div className={cl.imagePlace}>
            <img src={img} alt="" />
            <div
              onClick={() => {
                // @ts-ignore
                imageRef.current.value = "";
                // @ts-ignore
                setImg("");
                setImgFile(undefined);
              }}
              className={cl.imgCloseIcon}
            >
              <GiCrossMark />
            </div>
          </div>
        ) : (
          <div className={cl.uploadImgWrapper}>
            <div className={cl.uploadIcon}>
              <TbFileUpload />
            </div>

            <div className={cl.uploadText}>No img selected yet!</div>
          </div>
        )}
      </div>

      <label className={cl.uploadLabel}>
        <input
          onChange={uploadToHTML}
          // @ts-ignore
          ref={imageRef}
          type="file"
          accept="image/*"
        />
        <div className={cl.btnUpload}>CHOOSE FILE</div>
      </label>

      {img !== "" ? (
        <div onClick={uploadToStorage} className={cl.submitImg}>
          Submit
        </div>
      ) : null}

      {url !== "" ? (
        <a target="_blank" href={url} className={cl.linkToImg}>
          Get uploaded image
        </a>
      ) : null}
    </div>
  );
};
