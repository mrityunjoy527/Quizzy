import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { storage } from "./firebase/configuration";

export const upload = async (file) => {
  const timestamp = Date.now();
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
  };


  const compresedImage = await imageCompression(file, options);

  const storageRef = ref(storage, `/images/${timestamp + compresedImage.name}`);

  const uploadTask = uploadBytesResumable(storageRef, compresedImage);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
