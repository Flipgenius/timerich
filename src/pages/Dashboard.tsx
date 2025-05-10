import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

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
    </div>
  );
}
