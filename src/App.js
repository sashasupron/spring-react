import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Description from "./components/Description";
import Search from "./components/Search";
import Login from "./components/Login";

function ProjectPage() {
  return (
    <div className="App">
      <Header />
      <Description />
      <Search />
    </div>
  );
}

function App() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const location = useLocation();


  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<ProjectPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
