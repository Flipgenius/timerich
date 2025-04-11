import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const VALUES = [
  "My faith",
  "My family",
  "My health",
  "My creativity",
  "Making someone smile",
  "Learning something new",
  "Discipline",
  "Gratitude",
];

export default function DailyAlignment() {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user || !selected) return;

    try {
      await addDoc(collection(db, "alignment"), {
        uid: user.uid,
        email: user.email,
        value: selected,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
    } catch (err) {
      console.error("Failed to save alignment:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white border p-4 rounded shadow text-center mb-6">
        <p className="text-green-600 font-semibold">
          ✅ Your focus today is: {selected}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border p-4 rounded shadow text-center mb-6">
      <h3 className="text-lg font-semibold mb-3">
        🌟 What matters most to you today?
      </h3>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {VALUES.map((value) => (
          <button
            key={value}
            className={`px-3 py-1 rounded-full text-sm border ${
              selected === value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelected(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <button
        disabled={!selected}
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Save for Today
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2">Something went wrong.</p>
      )}
    </div>
  );
}
