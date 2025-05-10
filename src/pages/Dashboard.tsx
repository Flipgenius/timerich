import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import PlanGate from "@/components/PlanGate";

export default function Dashboard() {
  const [params] = useSearchParams();
  const plan = params.get("plan");

  useEffect(() => {
    const savePlanToFirestore = async () => {
      const user = auth.currentUser;
      if (!user || !plan) return;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { plan }, { merge: true });
      console.log(`✅ Saved plan: ${plan}`);
    };

    savePlanToFirestore();
  }, [plan]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>This is your productivity overview 🔥</p>

      <PlanGate allowed={["Pro", "Premium"]}>
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <h2 className="font-semibold">✨ Pro Feature</h2>
          <p>This content is only visible to Pro and Premium users.</p>
        </div>
      </PlanGate>

      <PlanGate allowed={["Premium"]}>
        <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
          <h2 className="font-semibold">💎 Premium Feature</h2>
          <p>This content is only visible to Premium users.</p>
        </div>
      </PlanGate>
    </div>
  );
}
