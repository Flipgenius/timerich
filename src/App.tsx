import { Routes, Route, HashRouter } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Planner from "./pages/Planner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <HashRouter>
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={user ? <Layout><Dashboard /></Layout> : <LandingPage />}
        />

        {/* Authenticated routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Layout><Planner /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout><Reports /></Layout>
            </ProtectedRoute>
          }
        />

        {/* Unwrapped routes */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}
