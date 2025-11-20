import { useState } from "react";
import { uploadMedia } from "../api/Media";

export default function MediaUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    try {
      setStatus("Uploading...");
      await uploadMedia(file);
      setStatus("Uploaded successfully!");
    } catch (error) {
      setStatus("Upload failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Media</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>

      <p>{status}</p>
    </div>
  );
}
