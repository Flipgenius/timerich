import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as fs from "fs";

const firebaseConfig = {
  apiKey: "AIzaSyBX78RRoFHQZjNPDIjvGaDAne4w6FCjI5o",
  authDomain: "timerich-web.firebaseapp.com",
  projectId: "timerich-web",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function exportEmails() {
  const snapshot = await getDocs(collection(db, "waitlist"));
  const csvLines: string[] = ["email,createdAt"];

  snapshot.forEach((doc) => {
    const data = doc.data();
    const email = data.email || "";
    const createdAt = data.createdAt?.seconds
      ? new Date(data.createdAt.seconds * 1000).toISOString()
      : "";
    csvLines.push(`${email},${createdAt}`);
  });

  fs.writeFileSync("waitlist.csv", csvLines.join("\n"));
  console.log("✅ Export complete: waitlist.csv");
}

exportEmails();
