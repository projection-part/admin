
import React, { useEffect, useState } from "react";
import { getPost, updatePost } from "../../api/postsApi";
import { useNavigate, useParams } from "react-router-dom";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const res = await getPost(id);
      setData({
        title: res.data.data.title,
        content: res.data.data.content,
      });
    } catch (err) {
      console.error("Failed to load post:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePost(id, data);
      alert("Post updated!");
      navigate("/dashboard/posts"); // Adjust route to your dashboard posts area
    } catch (err) {
      alert("Error updating post");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white backdrop-blur-lg rounded-lg border border-white/20 shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Edit Post</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-slate-800 font-medium mb-2">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
            className="px-4 py-2 rounded-lg bg-gray-200 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Enter post title"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <label className="text-slate-800 font-medium mb-2">Content</label>
          <textarea
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            rows={6}
            className="px-4 py-2 rounded-lg bg-gray-200 text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Enter post content"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-slate-600 hover:bg-slate-800 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
