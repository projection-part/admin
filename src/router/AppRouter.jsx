// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import { useSelector } from "react-redux";

// import PostsList from "../pages/posts/PostsList";
// import PostCreate from "../pages/posts/PostCreate";
// import PostEdit from "../pages/posts/PostEdit";

// import PagesList from "../pages/pages/PagesList";
// import CreatePage from "../pages/pages/CreatePage";
// import EditPage from "../pages/pages/EditPage";

// import MediaUpload from "../pages/MediaUpload";
// import MediaList from "../pages/MediaList";

// function PrivateRoute({ children }) {
//   const token = useSelector((state) => state.auth.token);
//   return token ? children : <Navigate to="/login" />;
// }

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         <Route path="/" element={<Navigate to="/dashboard" />} />
//         <Route
//           path="/dashboard/*"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />

//         <Route path="*" element={<Navigate to="/login" />} />

//         <Route
//   path="/dashboard/posts"
//   element={
//     <PrivateRoute>
//       <PostsList />
//     </PrivateRoute>
//   }
// />

// <Route
//   path="/posts/create"
//   element={
//     <PrivateRoute>
//       <PostCreate />
//     </PrivateRoute>
//   }
// />

// <Route
//   path="/posts/:id/edit"
//   element={
//     <PrivateRoute>
//       <PostEdit />
//     </PrivateRoute>
//   }
// />

// <Route path="/pages" element={
//   <PrivateRoute>
//   <PagesList />
//   </PrivateRoute>
//   } 
  
//   />
// <Route path="/pages/create" element={
//   <PrivateRoute>
//   <CreatePage />
//   </PrivateRoute>
//   } />
// <Route path="/pages/:id/edit" element={
//   <PrivateRoute>
//   <EditPage />
//   </PrivateRoute>
//   } />

//   <Route path="/media" element={<MediaList />} />
// <Route path="/media/upload" element={<MediaUpload />} />


//       </Routes>
//     </BrowserRouter>
//   );
// }
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Only one dashboard route */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
