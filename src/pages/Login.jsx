
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/AuthSlice";
import { Navigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  if (token) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-1">CMS Admin Panel Login</p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 mb-4 text-center text-sm bg-red-50 py-2 rounded-md">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         outline-none transition bg-gray-50"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         outline-none transition bg-gray-50"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={(e) =>
                  setData({ ...data, remember: e.target.checked })
                }
              />
              <span className="text-gray-700">Remember me</span>
            </label>

            <button
              type="button"
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                       text-white py-3 rounded-lg transition font-semibold shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} CMS Admin Panel — All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
