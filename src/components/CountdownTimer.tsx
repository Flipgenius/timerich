import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const launchDate = new Date("2025-08-01T00:00:00Z").getTime();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
      setDaysLeft(days);
    };

    updateCountdown(); // initial run
    const interval = setInterval(updateCountdown, 1000 * 60); // update every minute
    return () => clearInterval(interval);
  }, []);

  if (daysLeft === null) return null;

  return (
    <p className="text-sm text-blue-600 font-semibold mb-4">
      ⏳ Launching in <span className="font-bold">{daysLeft}</span> days — August 1, 2025
    </p>
  );
}
