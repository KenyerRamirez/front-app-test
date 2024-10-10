import React from "react";
import logo from "./assets/icons/logo.svg";
import Dashboard from "./pages/Dashboard";
import Evaluations from "./pages/Evaluations/index";
import Evaluation from "./pages/Evaluations/Evaluation/index";
import CreateEvaluation from "./pages/Evaluations/CreateEvaluation/index";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Nav>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path="/evaluations"
          element={<ProtectedRoute element={<Evaluations />} />}
        />
        <Route
          path="/evaluations/create"
          element={<ProtectedRoute element={<CreateEvaluation />} />}
        />
        <Route
          path="/evaluations/:id"
          element={<ProtectedRoute element={<Evaluation />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Nav>
  );
}

export default App;
