import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import LoginLayout from "../Layout/LoginLayout";
import Layout from "../Layout/Layout";
import ErrorPage from "../Pages/ErrorPage";
import Reports from "../Pages/Reports";
import Settings from "../Pages/Settings";
import PrivateRoute from "./PrivateRoute";

const RoutesComp = () => (
  <Routes>
    <Route path="login" element={<LoginLayout />}>
      <Route index element={<Login />} />
    </Route>
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route
        index
        element={
          <PrivateRoute>
            <Dashboard
              exception={{
                ex_id: "100",
                ex_name: "Radio Exceptions",
                refreshResult: false,
              }}
            />
          </PrivateRoute>
        }
      />

      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard
              exception={{
                ex_id: "100",
                ex_name: "Radio Exceptions",
                refreshResult: false,
              }}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="home"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default RoutesComp;
