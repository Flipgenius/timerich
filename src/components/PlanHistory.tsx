import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase";

interface Plan {
  id: string;
  prompt: string;
  output: string;
  createdAt?: { seconds: number };
}

export default function PlanHistory() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "plans"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const results: Plan[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Plan, "id">;
        results.push({ ...data, id: doc.id });
      });

      setPlans(results);
    };

    fetchPlans();
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Your Saved Plans</h3>
      <div className="space-y-4">
        {plans.length === 0 ? (
          <p>No plans saved yet.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="bg-white shadow p-4 rounded border">
              <p className="text-sm text-gray-500 mb-2">
                {plan.createdAt?.seconds
                  ? new Date(plan.createdAt.seconds * 1000).toLocaleString()
                  : "Unknown time"}
              </p>
              <p className="font-medium text-gray-700 mb-2">Prompt:</p>
              <pre className="whitespace-pre-wrap text-sm">{plan.prompt}</pre>
              <p className="font-medium text-gray-700 mt-4 mb-2">AI Response:</p>
              <pre className="whitespace-pre-wrap text-sm">{plan.output}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
