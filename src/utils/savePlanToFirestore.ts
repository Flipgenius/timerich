import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";

export async function savePlanToFirestore(prompt: string, output: string) {
  const user = auth.currentUser;
  if (!user) {
    console.warn("No authenticated user found. Skipping save.");
    return;
  }

  const doc = {
    uid: user.uid,
    email: user.email,
    prompt,
    output,
    createdAt: serverTimestamp(),
  };

  console.log("Attempting to save plan...", doc);

  try {
    await addDoc(collection(db, "plans"), doc);
    console.log("✅ Plan saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving plan to Firestore:", error);
  }
}
