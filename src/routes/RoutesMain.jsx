import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
//import Charts from "../pages/Charts";
import Admin from "../pages/cms/Admin";
import Dashboard from "../pages/cms/Dashboard";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import { AuthContext } from "../contexts/AuthProvider";
import AdminPermissions from "../pages/cms/AdminPermissions";
import AdminRoles from "../pages/cms/AdminRoles";
import AdminUsers from "../pages/cms/AdminUsers";
import AdminTasks from "../pages/cms/AdminTasks";

const RoutesMain = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [showAdmPanel, setShowAdmPanel] = useState(false);

  //Verificar si es Admin o Usuario comun
  useEffect(() => {
    if (isAuthenticated) {
      const verifyRole =
        user.role.name === "Administrador" || user.role.name === "Asistente";
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
        <Route path="/admin/tasks" element={<AdminTasks />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/roles" element={<AdminRoles />} />
        <Route path="/admin/permissions" element={<AdminPermissions />} />
      </Route>
      <Route
        path="/tasks"
        element={isAuthenticated ? <Tasks /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default RoutesMain;
