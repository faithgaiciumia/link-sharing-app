import { useState } from "react";
import { uploadToCloudinary } from "../data/cloudinaryUpload";


export default function ImageUploader() {
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file);
      setImageURL(url); 
      console.log("Uploaded image:", url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageURL && <img src={imageURL} alt="Uploaded" width={200} />}
    </div>
  );
}
