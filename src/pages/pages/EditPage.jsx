
import React, { useEffect, useState } from "react";
import { getPage, updatePage } from "../../api/PagesApi";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const loadPage = async () => {
    try {
      const res = await getPage(id);
      setTitle(res.data.data.title);
      setContent(res.data.data.content);
    } catch (err) {
      console.error("Failed to load page:", err);
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePage(id, { title, content });
      navigate("/dashboard/pages");
    } catch (err) {
      console.error("Failed to update page:", err);
      alert("Error updating page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg mt-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Edit Page</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-slate-800 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Enter page title"
          />
        </div>

        <div>
          <label className="block text-slate-800 font-medium mb-1">Content</label>
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Enter page content"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-gray-600 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Updating..." : "Update Page"}
        </button>
      </form>
    </div>
  );
}
