import React from "react";
import logo from "./assets/icons/logo.svg";
import Dashboard from "./pages/Dashboard";
import Evaluations from "./pages/Evaluations/index";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/evaluations" element={<Evaluations />} />
      </Routes>
    </Nav>
  );
}

export default App;
