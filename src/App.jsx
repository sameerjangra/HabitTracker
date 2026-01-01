import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Header from "./components/Header";
import Home from "./pages/Home";
import Habits from "./pages/Habits";
import AnalyticsPage from "./pages/AnalyticsPage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) navigate("/");
      else navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen p-6">
      {user && <Header />}

      <main className="max-w-6xl mx-auto">
        <Routes>
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/habits" element={user ? <Habits /> : <Navigate to="/auth" />} />
          <Route path="/analytics" element={user ? <AnalyticsPage /> : <Navigate to="/auth" />} />
        </Routes>
      </main>
    </div>
  );
}
