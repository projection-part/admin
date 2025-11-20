
import React, { useState } from "react";
import { createPage } from "../../api/PagesApi";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPage({ title, content });
      navigate("/dashboard/pages");
    } catch (err) {
      alert("Error creating page");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg mt-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Create Page</h2>

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
          {loading ? "Creating..." : "Create Page"}
        </button>
      </form>
    </div>
  );
}
