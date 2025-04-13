import { Routes, Route, HashRouter } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Planner from "./pages/Planner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";

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
          element={<Layout><Dashboard /></Layout>}
        />
        <Route
          path="/planner"
          element={<Layout><Planner /></Layout>}
        />
        <Route
          path="/reports"
          element={<Layout><Reports /></Layout>}
        />

        {/* Unwrapped routes */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

