import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

import Dashboard from "./pages/Dashboard";
import MyWeek from "./pages/MyWeek";
import Planner from "./pages/Planner";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";

function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  if (user === undefined) return <p className="p-4">Loading...</p>;

  return (
    <Router>
      {user ? (
        <div className="flex h-screen">
          <aside className="w-64 bg-gray-900 text-white p-4 hidden sm:block">
            <h2 className="text-2xl font-bold mb-6">TimeRich</h2>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-blue-400">Dashboard</Link></li>
              <li><Link to="/my-week" className="hover:text-blue-400">My Week</Link></li>
              <li><Link to="/planner" className="hover:text-blue-400">Planner</Link></li>
              <li><Link to="/reports" className="hover:text-blue-400">Reports</Link></li>
            </ul>
          </aside>

          <div className="flex-1 bg-gray-100">
            <Navbar />
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/my-week" element={<ProtectedRoute><MyWeek /></ProtectedRoute>} />
                <Route path="/planner" element={<ProtectedRoute><Planner /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
