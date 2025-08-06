import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginPage } from "../pages/login";
import { SignUp } from "../pages/signUp";
import { ProjectPage } from "../pages/projects";

const Router = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated && !['/login', '/signup'].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }


  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<ProjectPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export { Router };
