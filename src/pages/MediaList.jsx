
import { useEffect, useState } from "react";
import { getMedia, deleteMedia, updateMediaFilename } from "../api/Media";


import {
  BookmarkSquareIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon

} from "@heroicons/react/24/outline";

export default function MediaList() {
  const [media, setMedia] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newFilename, setNewFilename] = useState("");

  const fetchMedia = async () => {
    try {
      const res = await getMedia();
      setMedia(res.data.data);
    } catch (err) {
      console.log("Error fetching media:", err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    await deleteMedia(id);
    fetchMedia();
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setNewFilename(item.filename);
  };

  const saveFilename = async (id) => {
    if (!newFilename.trim()) return;
    await updateMediaFilename(id, newFilename);
    setEditingId(null);
    fetchMedia();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Media Library</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-white backdrop-blur-lg p-4 rounded-2xl border border-white shadow-md flex flex-col items-center"
          >
            <img
              src={`http://localhost:8000/storage/${item.path}`}
              alt={item.filename}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {editingId === item.id ? (
              <div className="w-full flex flex-col gap-2 items-center">
                <input
                  value={newFilename}
                  onChange={(e) => setNewFilename(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-300 text-slate-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveFilename(item.id)}
                    className="px-3 py-1 rounded-lg text-white font-semibold transition"
                  >
                    <BookmarkSquareIcon className="w-6 h-6 text-emerald-600" />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 rounded-lg text-white font-semibold transition"
                  >
                    <XCircleIcon className="w-6 h-6 text-rose-600" />

                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-800 font-medium mb-2 text-center break-words">
                {item.filename}
              </p>
            )}

            <div className="flex gap-2 mt-2">
              {editingId !== item.id && (
                <button
                  onClick={() => startEditing(item)}
                  className="px-3 py-1 rounded-lg text-white font-semibold transition"
                >
                  <PencilSquareIcon className="w-6 h-6 text-indigo-600" />

                </button>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 rounded-lg text-white font-semibold transition"
              >
                <TrashIcon className="w-6 h-6 text-rose-600" />

              </button>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && (
        <p className="text-gray-300 mt-6 text-center">No media files found.</p>
      )}
    </div>
  );
}
