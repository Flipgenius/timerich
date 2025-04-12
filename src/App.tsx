import { Routes, Route, HashRouter } from "react-router-dom";
import Planner from "./pages/Planner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
