import CountdownTimer from "../components/CountdownTimer";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase";
import CountUp from "react-countup";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const snapshot = await getCountFromServer(collection(db, "waitlist"));
      const count = snapshot.data().count + 5000;
      setWaitlistCount(count);
    };
    fetchCount();
  }, []);

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
      <div className="min-h-screen bg-white flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            🎉 You're on the Waitlist!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            You’ll be among the first to experience TimeRich — the AI planner
            that helps you live with purpose.
          </p>

          <p className="text-md font-medium text-gray-800 mb-2">
            Want early access sooner?
          </p>
          <p className="text-gray-600 mb-6">
            Share TimeRich with your friends:
          </p>

          <div className="flex justify-center flex-wrap gap-4 mb-6">
            <a
              href={`https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              Share on X
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

          <p className="text-sm text-gray-500">
            Thank you for supporting TimeRich. We’ll be in touch soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
  Master Your Time with AI
</h1>

<CountdownTimer />

<p className="text-lg text-gray-700 max-w-xl mb-6">
  TimeRich helps you design your ideal week, avoid burnout, and live every day
  with purpose. Powered by AI. Guided by your values.
</p>

      <p className="text-sm text-gray-500 mb-4">
        🧠 Trusted by productivity coaches, pastors, students, and founders.
      </p>

      <ul className="text-left text-gray-700 mb-8 max-w-md space-y-2">
        <li>✅ Get a personalized daily plan in seconds</li>
        <li>✅ Align your schedule with your faith, family, and purpose</li>
        <li>✅ Detect burnout early and reclaim your peace</li>
      </ul>

      {waitlistCount !== null && (
        <p className="text-gray-500 mb-4 text-sm">
          🎉{" "}
          <span className="font-medium">
            <CountUp key={waitlistCount} end={waitlistCount} duration={1.5} />
          </span>{" "}
          people have already joined the waitlist!
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-4"
      >
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

      <p className="text-sm text-gray-500 mb-2">
        🚀 Launching August 1, 2025 — early access is limited.
      </p>

      <p className="text-xs text-gray-400 italic max-w-md mt-4">
        “I built TimeRich because I was tired of burnout and busywork. I wanted
        to live on purpose — and help others do the same.”  
        <br />– John Anton, Founder
      </p>
    </div>
  );
}
