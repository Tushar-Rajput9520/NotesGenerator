import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { serverUrl } from "../App";

function Pricing() {

  const [billing, setBilling] = useState("monthly");
  const [selected, setSelected] = useState(null);
  const [paying, setPaying] = useState(false);

  const handlePaying = async (amount) => {
    try {
      setSelected(amount);
      setPaying(true);

      const result = await axios.post(
        serverUrl + "/api/credits/order",
        { amount },
        { withCredentials: true }   // ✅ corrected
      );

      if (result.data.url) {
        window.location.href = result.data.url;
      }

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  const plans = [
    {
      title: "Starter",
      monthly: 100,
      yearly: 900,
      credits: "50 Credits",
      features: ["AI Notes", "Exam Answers", "Charts Support"]
    },
    {
      title: "Popular",
      monthly: 200,
      yearly: 1800,
      credits: "120 Credits",
      features: ["All Starter", "Revision Mode", "Priority AI"],
      popular: true
    },
    {
      title: "Pro",
      monthly: 500,
      yearly: 4500,
      credits: "300 Credits",
      features: ["Unlimited Revision", "Full Syllabus", "Charts + Diagrams"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-black px-6 py-16">

      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Flexible Pricing
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3">
          Choose a plan that fits your learning journey
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-md flex">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-full ${
              billing === "monthly"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-6 py-2 rounded-full ${
              billing === "yearly"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Yearly 🔥 10% OFF
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {plans.map((plan, index) => {
          const price =
            billing === "monthly" ? plan.monthly : plan.yearly;

          return (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className={`relative p-8 rounded-3xl shadow-xl bg-white dark:bg-gray-800 ${
                plan.popular
                  ? "border-2 border-indigo-600"
                  : "border border-gray-200 dark:border-gray-700"
              }`}
            >

              {plan.popular && (
                <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {plan.title}
              </h2>

              <div className="mt-5">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  ₹{price}
                </p>
                <p className="text-indigo-600 text-sm">
                  {plan.credits}
                </p>
              </div>

              <button
                onClick={() => handlePaying(price)}  // ✅ payment call
                disabled={paying}
                className="w-full mt-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition"
              >
                {paying && selected === price
                  ? "Processing..."
                  : "Buy Now"}
              </button>

              <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Pricing;