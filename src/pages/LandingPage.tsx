import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    try {
      await addDoc(collection(db, "waitlist"), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error adding email to waitlist:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    const shareText = encodeURIComponent(
      "🔥 I just joined the TimeRich waitlist! An AI planner to help me live with purpose. Join me:"
    );
    const shareUrl = encodeURIComponent("https://usetimerich.com");

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">🎉 You're on the Waitlist!</h1>
          <p className="text-lg text-gray-700 mb-6">
            You’ll be among the first to experience TimeRich — the AI planner that helps you live with purpose.
          </p>

          <p className="text-md font-medium text-gray-800 mb-2">Want early access sooner?</p>
          <p className="text-gray-600 mb-6">Share TimeRich with your friends:</p>

          <div className="flex justify-center flex-wrap gap-4 mb-6">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Share on Twitter
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Share on Facebook
            </a>

            <a
              href={`mailto:?subject=Join me on TimeRich!&body=Check out this AI-powered planner I'm using: ${shareUrl}`}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Share via Email
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Share on WhatsApp
            </a>
          </div>

          <p className="text-sm text-gray-500">Thank you for supporting TimeRich. We’ll be in touch soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col justify-center items-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          TimeRich
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Become the master of your time with AI. TimeRich helps you build your ideal week,
          avoid burnout, and live with purpose.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Join the Waitlist
          </button>
        </form>

        {status === "error" && (
          <p className="text-red-500 font-medium">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  );
}
