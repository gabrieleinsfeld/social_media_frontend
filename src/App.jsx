import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to={"/log-in"}></Navigate>;
  }
  return (
    <>
      <Sidebar></Sidebar>

      <div id="content">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
