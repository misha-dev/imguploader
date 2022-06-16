// @ts-nocheck
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TbFileUpload } from "react-icons/tb";
import { v4 } from "uuid";
import { storage } from "../../firebase/config";
import { Loader } from "../Loader/Loader";
import cl from "./ImageUploader.module.css";
export const ImageUploader = () => {
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState();
  const [url, setUrl] = useState("");
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const imageRef = useRef();
  const urlRef = useRef();
  const storageImgRef = ref(storage, `/imgs/${v4()}`);
  const [copyTextValues, setCopyTextValues] = useState([cl.copyText]);

  const uploadToHTML = () => {
    // @ts-ignore
    const file = imageRef.current.files[0];
    if (file) {
      setShowUrl(false);
      setImgFile(file);
      setUrl("");
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
    setShowUrl(true);
    setLoadingUrl(true);
    // @ts-ignore
    uploadBytes(storageImgRef, imgFile).then((response) => {
      getDownloadURL(response.ref).then((url) => {
        setUrl(url);
        setLoadingUrl(false);
      });
    });

    // @ts-ignore
    imageRef.current.value = "";

    setImgFile(undefined);
  };

  const copyToClickBoard = () => {
    // @ts-ignore
    navigator.clipboard.writeText(urlRef.current.value);
    setCopyTextValues([...copyTextValues, cl.active]);

    setTimeout(() => {
      setCopyTextValues([cl.copyText]);
    }, 1000);
  };

  return (
    <div className={cl.uploaderWrapper}>
      <div className={cl.headText}>
        Upload <span>IMAGE</span> get <span>LINK</span>
      </div>
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
              <ImCross />
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
      {img !== "" && !showUrl ? (
        <div onClick={uploadToStorage} className={cl.submitBtn}>
          Upload
        </div>
      ) : null}

      {showUrl ? (
        loadingUrl ? (
          <div className={`${cl.submitBtn} ${cl.loaderStyle}`}>
            <Loader />
            <p>Loading</p>
          </div>
        ) : (
          <div className={cl.urls}>
            <a target="_blank" href={url} className={cl.submitBtn}>
              Get uploaded image
            </a>
            <div
              onClick={copyToClickBoard}
              className={copyTextValues.join(" ")}
            >
              <input ref={urlRef} disabled value={url} type="text" />
              <div className={cl.iconCopy}>
                <FaRegCopy />
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};
