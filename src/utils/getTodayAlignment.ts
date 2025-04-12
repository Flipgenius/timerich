import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getTodayAlignment(uid: string): Promise<string | null> {
  const startOfDay = Timestamp.fromDate(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const q = query(
    collection(db, "alignment"),
    where("uid", "==", uid),
    where("createdAt", ">=", startOfDay),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return doc.data().value || null;
}
