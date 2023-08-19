import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
//import Charts from "../pages/Charts";
import Admin from "../pages/Admin";
import ManagementTask from "../pages/ManagementTask";
import ManagementUser from "../pages/ManagementUser";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/tasks" element={<ManagementTask />} />
        <Route path="/admin/users" element={<ManagementUser />} />
      </Route>
      <Route path="*" element={<NotFound />}></Route>

    </Routes>
  );
};

export default RoutesMain;
