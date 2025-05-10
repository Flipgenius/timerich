import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";

export type UserPlan = "Free" | "Pro" | "Premium" | null;

export const useUserPlan = (): UserPlan => {
  const [plan, setPlan] = useState<UserPlan>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setPlan(userData.plan || "Free");
        } else {
          setPlan("Free");
        }
      } else {
        setPlan(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return plan;
};
