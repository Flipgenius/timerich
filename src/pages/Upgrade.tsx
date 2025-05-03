import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

// Load Stripe with your public key from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

export default function Upgrade() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    const stripe = await stripePromise;
    if (!stripe) {
      alert("Stripe failed to load.");
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      successUrl: "https://usetimerich.com/#/dashboard",
      cancelUrl: "https://usetimerich.com/#/upgrade",
    });

    if (error) {
      console.error("Stripe checkout error:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-2">Upgrade to TimeRich Pro or Premium</h1>
      <p className="text-gray-600 mb-10">
        Get unlimited AI planning, SmartWeek generation, burnout prevention, and more.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Pro Plan */}
        <div className="bg-white border rounded shadow p-6">
          <h2 className="text-2xl font-semibold mb-2">Pro</h2>
          <p className="text-3xl font-bold text-blue-600 mb-4">$10/mo</p>
          <ul className="text-left space-y-2 text-sm mb-6">
            <li>✅ Unlimited AI plans</li>
            <li>✅ Smart TimeBlocks™</li>
            <li>✅ Daily Alignment + SmartWeek</li>
            <li>✅ Burnout Radar + Weekly Recap</li>
          </ul>
          <button
            disabled={loading}
            onClick={() => handleCheckout("price_1RKhWHRKz6azfPKyfWvwn5IK")}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
          >
            {loading ? "Redirecting..." : "Get Pro"}
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white border rounded shadow p-6">
          <h2 className="text-2xl font-semibold mb-2">Premium</h2>
          <p className="text-3xl font-bold text-purple-600 mb-4">$29/mo</p>
          <ul className="text-left space-y-2 text-sm mb-6">
            <li>✅ Everything in Pro</li>
            <li>✅ AI Calendar Rewrite Assistant</li>
            <li>✅ SmartWeek Generator + Templates</li>
            <li>✅ Advanced insights + Recap export</li>
          </ul>
          <button
            disabled={loading}
            onClick={() => handleCheckout("price_1RKhbeRKz6azfPKyIyY9qptR")}
            className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700"
          >
            {loading ? "Redirecting..." : "Get Premium"}
          </button>
        </div>
      </div>
    </div>
  );
}
