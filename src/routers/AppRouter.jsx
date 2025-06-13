import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/admin/dashboard"
        element={<PrivateRoute role="admin"><Dashboard /></PrivateRoute>}
      />
      <Route
        path="/user/dashboard"
        element={<PrivateRoute role="user"><Dashboard /></PrivateRoute>}
      />
      <Route path = "*" element={<NotFound/>}/>
    </Routes>
  );
};

export default AppRouter;
