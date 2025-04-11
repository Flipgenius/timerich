import DailyAlignment from "../components/DailyAlignment";
import PlannerAI from "../components/PlannerAI";
import PlanHistory from "../components/PlanHistory";

export default function Planner() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <DailyAlignment />
      <PlannerAI />
      <PlanHistory />
    </div>
  );
}

