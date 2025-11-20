
import { useState } from "react";
import axiosClient from "../../api/AxiosClient";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const uploadImage = async () => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post("/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = await uploadImage();

      let finalContent = content;
      if (imageUrl) {
        finalContent += `\n\n Image: ${imageUrl}`;
      }

      await axiosClient.post("/posts", {
        title,
        content: finalContent,
      });

      alert("Post created!");
      setTitle("");
      setContent("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      alert("Error creating post");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white backdrop-blur-lg rounded-lg border border-white/20 shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Create Post</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-slate-800 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-4 py-2 rounded-lg bg-gray-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Enter post title"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <label className="text-slate-800 font-medium mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="px-4 py-2 rounded-sm bg-gray-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Enter post content"
          />
        </div>

        {/* Upload Image */}
        <div className="flex flex-col">
          <label className="text-slate-800 font-medium mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="text-slate-800"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 w-48 h-32 object-cover rounded-lg border border-white/20"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gray-600 hover:bg-slate-800 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
