import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
//import Charts from "../pages/Charts";
import Admin from "../pages/Admin";
import ManagementTask from "../pages/ManagementTask";
import ManagementUser from "../pages/ManagementUser";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import { AuthContext } from "../contexts/AuthProvider";

const RoutesMain = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [showAdmPanel, setShowAdmPanel] = useState(false);

  //Verificar si es Admin o Usuario comun
  useEffect(() => {
    if (isAuthenticated) {
      const verifyRole = user.roles.some((element) => {
        return element.name === "Administrator" || element.name === "Assistant";
      });
      //console.log(verifyRole)
      setShowAdmPanel(verifyRole);
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/tasks" /> : <Login />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          isAuthenticated === true && showAdmPanel ? (
            <Admin />
          ) : (
            <Navigate to="/tasks" />
          )
        }
      >
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/tasks" element={<ManagementTask />} />
        <Route path="/admin/users" element={<ManagementUser />} />
      </Route>
      <Route
        path="/tasks"
        element={isAuthenticated ? <Tasks /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default RoutesMain;
