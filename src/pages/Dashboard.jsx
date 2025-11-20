
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import { logout } from "../redux/AuthSlice";

import {
  HomeIcon,
  DocumentTextIcon,
  NewspaperIcon,
  PhotoIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  SquaresPlusIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,

  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

// Import your page components
import PostsList from "./posts/PostsList";
import PagesList from "./pages/PagesList";
import MediaList from "./MediaList";

import PostCreate from "./posts/PostCreate";
import PostEdit from "./posts/PostEdit";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";


function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  return (
    <div className="min-h-screen bg-gray-100 text-white flex">

      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 left-4 md:hidden  p-2 rounded-lg bg-slate-950 border border-white/20"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
  className={`fixed z-50 md:static h-auto md:min-h-screen top-0 left-0  w-64 bg-slate-950  backdrop-blur-lg border-r border-white/20 p-6 flex flex-col transform transition-transform duration-300 ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  }`}
>
  {/* Close button mobile */}
  <button
    className="md:hidden mb-6 bg-gray-500 px-3 py-1 rounded-lg"
    onClick={() => setSidebarOpen(false)}
  >
    Close ✕
  </button>

  <h2 className="text-xl font-bold mb-4 tracking-wide w-full flex items-center gap-3 text-left px-2 py-2"><ShieldCheckIcon className="w-10 h-10" />CMS Admin Panel</h2>

  <nav className="space-y-3">
    <Link
      to="/dashboard"
      className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-white/20 transition"
    >
      <SquaresPlusIcon className="w-5 h-5" /> Dashboard
    </Link>

    <Link
      to="/dashboard/posts"
      className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-white/20 transition"
    >
      <NewspaperIcon className="w-5 h-5" /> Posts
    </Link>

    <Link
      to="/dashboard/pages"
      className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-white/20 transition"
    >
      <DocumentTextIcon className="w-5 h-5" /> Pages
    </Link>

    <Link
      to="/dashboard/media"
      className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-white/20 transition"
    >
      <PhotoIcon className="w-5 h-5" /> Media
    </Link>

    <Link
      to=""
      className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-white/20 transition"
    >
      <Cog8ToothIcon className="w-5 h-5" /> Settings
    </Link>

    <Link
      
      onClick={() => dispatch(logout())}
      className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-white/20 transition"
    >
      <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
    </Link>

  </nav>

  {/* <button
    onClick={() => dispatch(logout())}
    className="mt-auto bg-red-500 hover:bg-red-600 w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
  >
    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
    Logout
  </button> */}
</aside>


      {/* Main Area */}
      <main className="bg-gray-100 flex-1 p-6 mt-10 md:mt-0">
        <Routes>
          {/* Default dashboard welcome */}
          <Route
            path=""
            element={
              <>
                <div className="backdrop-blur-lg p-5 rounded-2xl  bg-white shadow-2xl">
                  <h1 className="text-2xl font-bold mb-2 text-slate-950">Dashboard</h1>
                  <p className="text-xl text-slate-950">
                    Welcome , <span className="font-semibold">{user?.name ? user?.name : "Admin"}</span>
                  </p>
                </div>

                <div className="grid gap-6 mt-10 mb-10 sm:grid-cols-2 md:grid-cols-4">
                  <div className="bg-white shadow-md border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Total Posts</h3>
                      <DocumentTextIcon className="w-10 h-10 text-blue-600 " />
                    </div>
                    <p className="text-2xl mt-3 font-bold text-gray-800">8</p>
                  </div>

                  <div className="bg-white  shadow-md border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Pages</h3>
                      <ClipboardDocumentListIcon className="w-10 h-10 text-cyan-300" />
                    </div>
                    <p className="text-2xl mt-3 font-bold text-slate-800">5</p>
                  </div>

                  <div className="bg-white  shadow-md border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Media Files</h3>
                      <PhotoIcon className="w-10 h-10 text-green-600" />
                    </div>
                    <p className="text-2xl mt-3 font-bold text-slate-800">10</p>
                  </div>

                  <div className="bg-white  shadow-md border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Published</h3>
                      <ClipboardDocumentCheckIcon className="w-10 h-10 text-yellow-700" />

                    </div>
                    <p className="text-2xl mt-3 font-bold text-slate-800">9</p>
                  </div>

                  
                </div>
<h3 className="text-2xl font-semibold text-slate-800">Quick Actions</h3>
                <div className="grid gap-6 mt-10 mb-10 sm:grid-cols-2 md:grid-cols-3">
                
                <Link to="/dashboard/posts/create">
                  <div className="bg-white  shadow-md border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Create Post</h3>
                      <PencilSquareIcon className="w-10 h-10 text-purple-700" />
                    </div>
                    <p className="text-sm mt-3 font-medium text-slate-700">
                      Write a new post
                    </p>
                  </div>
                  </Link>

                  <Link to="/dashboard/pages/create">
                  <div className="bg-white  shadow-md border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Create Page</h3>
                      <DocumentDuplicateIcon className="w-10 h-10 text-blue-700" />
                    </div>
                    <p className="text-sm mt-3 font-medium text-slate-700">
                      Add a new Static page
                    </p>
                  </div>
                  </Link>

                  <Link to="/dashboard/media">
                   <div className="bg-white shadow-md border border-white/10 rounded-2xl p-4 hover:bg-white/20 transition">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                        Manage Media
                        </h3>
                        <PhotoIcon className="w-10 h-10 text-green-700" />
                      </div>
                      <p className="text-sm mt-3 font-medium text-slate-700">
                        Organize Our media files
                      </p>
                    </div>
                    </Link>
</div>


              </>
            }
          />

          <Route path="posts" element={<PostsList />} />

          {/* Nested Routes */}
          <Route path="posts" element={<PostsList />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="media" element={<MediaList />} />

          <Route path="posts/create" element={<PostCreate />} />
          <Route path="posts/:id/edit" element={<PostEdit />} />
          
          <Route path="pages/create" element={<CreatePage />} />
          <Route path="pages/:id/edit" element={<EditPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
