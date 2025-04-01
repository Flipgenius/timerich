import { useState } from "react";
import { savePlanToFirestore } from "../utils/savePlanToFirestore";

export default function PlannerAI() {
  const [input, setInput] = useState("Design my ideal day based on focus, health, and rest.");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a productivity coach. Create a clear, motivating daily schedule with time blocks based on the user's goals.",
            },
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.7,
        }),
      });

      console.log("OpenAI API response:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Full OpenAI Error Response:", errorText);
        throw new Error("OpenAI request failed.");
      }

      const data = await response.json();
      const plan = data.choices?.[0]?.message?.content || "Something went wrong.";
      setOutput(plan);
      savePlanToFirestore(input, plan);
    } catch (error) {
      console.error("❌ OpenAI API Error:", error);
      setOutput("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">AI-Powered Daily Planner</h2>
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
