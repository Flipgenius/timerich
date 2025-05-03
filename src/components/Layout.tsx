import { ReactNode } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col px-4 py-6">
        <h1 className="text-2xl font-bold mb-8">TimeRich</h1>
        <nav className="flex flex-col space-y-4">
          <a href="/#/dashboard" className="hover:underline">Dashboard</a>
          <a href="/#/planner" className="hover:underline">Planner</a>
          <a href="/#/reports" className="hover:underline">Reports</a>

          {/* Future links (grayed out but clickable for now) */}
          <hr className="border-gray-700 my-4" />
          <a href="/#/smartweek" className="text-sm text-gray-400 hover:text-white">SmartWeek</a>
          <a href="/#/referrals" className="text-sm text-gray-400 hover:text-white">Referrals</a>
          <a href="/#/upgrade" className="text-sm text-gray-400 hover:text-white">Upgrade</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {/* Top bar */}
        <div className="flex justify-end items-center mb-6">
          {user && (
            <div className="text-sm text-gray-700">
              Welcome, <span className="font-medium">{user.email}</span>
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Page content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
