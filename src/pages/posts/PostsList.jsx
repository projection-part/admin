
import React, { useEffect, useState } from "react";
import { getPosts, deletePost, togglePublish } from "../../api/postsApi";
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

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      setPosts(res?.data || []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deletePost(id);
    loadPosts();
  };

  const handlePublish = async (id) => {
    await togglePublish(id);
    loadPosts();
  };

  if (loading)
    return (
      <h3 className="text-slate-800 text-xl font-semibold">Loading posts...</h3>
    );

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Posts</h2>
        <Link
          to="/dashboard/posts/create"
          className="bg-slate-800 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
        >
          ➕ Create Post
        </Link>
      </div>

      {/* Table layout for medium+ screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white/10 backdrop-blur-lg border border-slate-600 rounded-xl">
          <thead>
            <tr className="text-left text-slate-950">
              <th className="px-3 py-4 border-b border-slate-600">ID</th>
              <th className="px-3 py-4 border-b border-slate-600 text-center">Title</th>
              <th className="px-3 py-4 border-b border-slate-600">Status</th>
              <th className="px-3 py-4 border-b border-slate-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-300 font-medium"
                >
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-gray-300 transition rounded-lg"
                >
                  <td className="px-3 py-4 text-slate-900">{post.id}</td>
                  {/* <td className="px-3 py-2">
                    <img
                      src={
                        post.media_url ||
                        "https://media.istockphoto.com/id/537215344/photo/denver-colorado-skyscrapers-snowy-longs-peak-rocky-mountains-summer.jpg?s=1024x1024&w=is&k=20&c=cYTYtkftbQl9rL_g7-wkHB5zLmOCjYYOJD96q2ObJMw="
                      }
                      alt="media"
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                  </td> */}
                  <td
                    className="px-3 py-4 text-slate-900 max-w-[180px] sm:max-w-[220px] md:max-w-[280px] truncate"
                    title={post.title}
                  >
                    {post.title}
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        post.is_published
                          ? "text-slate-900"
                          : "text-slate-800"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handlePublish(post.id)}
                        className={`px-2 rounded-lg text-sm font-medium transition ${
                          post.is_published
                            ? "text-white"
                            : "text-white"
                        }`}
                      >
                        {post.is_published ? <CheckCircleIcon className="w-6 h-6 text-emerald-600" />


 : <XCircleIcon className="w-6 h-6 text-rose-600" />

}
                      </button>
                      <Link
                        to={`/dashboard/posts/${post.id}/edit`}
                        className="px-2 text-white rounded-lg text-sm font-medium"
                      >
                        <PencilSquareIcon className="w-6 h-6 text-indigo-600" />

                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-2 text-white rounded-lg text-sm font-medium"
                      >
                        <TrashIcon className="w-6 h-6 text-rose-600" />

                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="sm:hidden flex flex-col gap-4">
        {posts.length === 0 ? (
          <p className="text-slate-800 text-center">No posts found.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white backdrop-blur-lg border border-white/20 rounded-xl p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                {/* <img
                  src={
                    post.media_url ||
                    "https://media.istockphoto.com/id/537215344/photo/denver-colorado-skyscrapers-snowy-longs-peak-rocky-mountains-summer.jpg?s=1024x1024&w=is&k=20&c=cYTYtkftbQl9rL_g7-wkHB5zLmOCjYYOJD96q2ObJMw="
                  }
                  alt="media"
                  className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                /> */}
                <div className="flex-1">
                  <h3
                    className="text-slate-800 font-semibold truncate max-w-[120px] sm:max-w-[160px] md:max-w-[200px]"
                    title={post.title}
                  >
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Status:{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        post.is_published
                          ? "text-slate-800"
                          : "text-slate-800"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => handlePublish(post.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    post.is_published
                      ? "text-white"
                      : "text-white"
                  }`}
                >
                  {post.is_published ? <CheckCircleIcon className="w-6 h-6 text-emerald-600" />


 : <XCircleIcon className="w-6 h-6 text-rose-600" />}
                </button>
                <Link
                  to={`/dashboard/posts/${post.id}/edit`}
                  className="px-3 py-1 text-white rounded-lg text-sm font-medium"
                >
                  <PencilSquareIcon className="w-6 h-6 text-indigo-600" />
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-3 py-1 text-white rounded-lg text-sm font-medium"
                >
                  <TrashIcon className="w-6 h-6 text-rose-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostsList;
