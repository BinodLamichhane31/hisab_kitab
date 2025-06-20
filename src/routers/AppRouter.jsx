import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/DashboardPage";
import NotFound from "../pages/NotFound";
import DashboardPage from "../pages/DashboardPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
            path="/dashboard"
            element={
              <PrivateRoute> {/* Protect this route from unauthenticated users */}
                <DashboardPage />
              </PrivateRoute>
            }
          />
      <Route path = "*" element={<NotFound/>}/>
    </Routes>
  );
};

export default AppRouter;
