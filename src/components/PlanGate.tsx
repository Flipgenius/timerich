import { ReactNode } from "react";
import { useUserPlan } from "@/hooks/useUserPlan";

type PlanGateProps = {
  allowed: ("Free" | "Pro" | "Premium")[];
  children: ReactNode;
  fallback?: ReactNode;
};

export default function PlanGate({ allowed, children, fallback = null }: PlanGateProps) {
  const plan = useUserPlan();

  if (plan === null) return null; // still loading
  if (allowed.includes(plan)) return <>{children}</>;

  return <>{fallback}</>;
}
