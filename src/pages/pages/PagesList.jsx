
import React, { useEffect, useState } from "react";
import { getPages, deletePage, togglePublishPage } from "../../api/PagesApi";
import { Link } from "react-router-dom";


import {
  CloudArrowUpIcon,
  CloudArrowDownIcon,
  ArrowUpCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

export default function PagesList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPages = async () => {
    try {
      setLoading(true);
      const res = await getPages();
      setPages(res.data || []);
    } catch (err) {
      console.error("Failed to load pages:", err);
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this page?")) return;
    await deletePage(id);
    loadPages();
  };

  const handlePublish = async (id) => {
    await togglePublishPage(id);
    loadPages();
  };

  if (loading) return <p className="text-slate-800 text-lg">Loading pages...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white backdrop-blur-lg rounded-lg border border-white/20 shadow-lg mt-6">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 sm:mb-0">Pages</h2>
        <Link
          to="/dashboard/pages/create"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
        >
          ➕ Create Page
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left bordercollaps border border-slate-600 rounded-xl">
          <thead>
            <tr className="bg-white/20 text-slate-800 uppercase text-sm font-semibold">
              <th className="py-3 px-4 border-b border-slate-600">ID</th>
              <th className="py-3 px-4 border-b border-slate-600">Title</th>
              <th className="py-3 px-4 border-b border-slate-600">Status</th>
              <th className="py-3 px-4 border-b border-slate-600 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-slate-800">
                  No pages found.
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr
                  key={page.id}
                  className="hover:bg-gray-300  transition"
                >
                  <td className="py-3 px-4 text-slate-800">{page.id}</td>
                  <td className="py-3 px-4 text-slate-800">{page.title}</td>
                  <td className="py-3 px-4 text-slate-800">
                    {page.is_published ? "Published" : "Draft"}
                  </td>
                  <td className="py-3 px-4 flex flex-col sm:flex-row justify-center items-center gap-2">
                    <button
                      onClick={() => handlePublish(page.id)}
                      className={`px-3 py-1 rounded-lg text-slate-800 font-medium transition ${
                        page.is_published
                          ? "text-white"
                          : "text-white"
                      }`}
                    >
                      {page.is_published ? <CheckCircleIcon className="w-6 h-6 text-emerald-600" />


 : <XCircleIcon className="w-6 h-6 text-rose-600" />}
                    </button>

                    <Link
                      to={`/dashboard/pages/${page.id}/edit`}
                      className="px-3 text-white rounded-lg font-medium transition"
                    >
                       <PencilSquareIcon className="w-6 h-6 text-indigo-600" />
                    </Link>

                    <button
                      onClick={() => handleDelete(page.id)}
                      className="px-3 py-1 text-white rounded-lg font-medium transition"
                    >
                      <TrashIcon className="w-6 h-6 text-rose-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
