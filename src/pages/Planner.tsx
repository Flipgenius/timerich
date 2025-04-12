import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getTodayAlignment } from "../utils/getTodayAlignment";
import DailyAlignment from "../components/DailyAlignment";
import PlannerAI from "../components/PlannerAI";
import PlanHistory from "../components/PlanHistory";

export default function Planner() {
  const [user] = useAuthState(auth);
  const [alignment, setAlignment] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getTodayAlignment(user.uid).then((value) => setAlignment(value));
    }
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {alignment && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 mb-6 rounded">
          <p className="text-sm font-semibold">💡 Your focus today:</p>
          <p className="text-lg font-bold mt-1">{alignment}</p>
        </div>
      )}

      <DailyAlignment />
      <PlannerAI />
      <PlanHistory />
    </div>
  );
}
