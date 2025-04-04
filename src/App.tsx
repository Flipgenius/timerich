import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyWeek from "./pages/MyWeek";
import Planner from "./pages/Planner";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-4">
          <h2 className="text-2xl font-bold mb-6">TimeRich</h2>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-blue-400">Dashboard</Link></li>
            <li><Link to="/my-week" className="hover:text-blue-400">My Week</Link></li>
            <li><Link to="/planner" className="hover:text-blue-400">Planner</Link></li>
            <li><Link to="/reports" className="hover:text-blue-400">Reports</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          <Navbar />
          <div className="p-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/my-week" element={<ProtectedRoute><MyWeek /></ProtectedRoute>} />
              <Route path="/planner" element={<ProtectedRoute><Planner /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
