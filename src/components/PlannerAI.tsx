import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getTodayAlignment } from "../utils/getTodayAlignment";
import { savePlanToFirestore } from "../utils/savePlanToFirestore";

export default function PlannerAI() {
  const [input, setInput] = useState(
    "Design my ideal day based on focus, health, and rest."
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [alignment, setAlignment] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getTodayAlignment(user.uid).then((value) => setAlignment(value));
    }
  }, [user]);

  const generatePlan = async () => {
    setLoading(true);
    setOutput("");

    const alignmentNote = alignment
      ? ` My personal focus today is: ${alignment}.`
      : "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a compassionate and intentional AI planning assistant. You help people create meaningful, value-driven daily schedules.",
          },
          {
            role: "user",
            content: input + alignmentNote,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const plan = data.choices?.[0]?.message?.content || "Something went wrong.";
    setOutput(plan);

    if (user) {
      savePlanToFirestore(input + alignmentNote, plan);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">AI-Powered Daily Planner</h2>

      {alignment && (
        <p className="text-sm text-gray-600 mb-2">
          ✨ Today’s focus: <span className="font-medium">{alignment}</span>
        </p>
      )}

      <textarea
        className="w-full p-3 border rounded mb-4"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your goals or priorities for the day..."
      />
      <button
        onClick={generatePlan}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Generating..." : "Generate My Day Plan"}
      </button>

      {output && (
        <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded border">
          {output}
        </div>
      )}
    </div>
  );
}
