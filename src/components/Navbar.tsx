import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">TimeRich</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-sm">Welcome, {user.email}</p>
          <button
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-sm">Not logged in</p>
      )}
    </nav>
  );
}
