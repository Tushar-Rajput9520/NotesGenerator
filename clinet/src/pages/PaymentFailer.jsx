import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function PaymentFailer() {

  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/pricing");
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };

  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-50 dark:from-gray-900 dark:via-black dark:to-gray-800 px-6">

      {/* Red Glow Background */}
      <div className="absolute w-72 h-72 bg-red-500/20 blur-3xl rounded-full animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-red-200 dark:border-gray-700"
      >

        {/* Animated Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6 }}
          className="text-red-500 text-7xl mb-6 flex justify-center"
        >
          <FiXCircle />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-red-600"
        >
          Payment Failed ❌
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 dark:text-gray-300 mt-3"
        >
          Something went wrong during the transaction.
          Please try again.
        </motion.p>

        {/* Countdown */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-500 mt-4"
        >
          Redirecting to pricing page in <span className="font-semibold">{seconds}</span> seconds...
        </motion.p>

        {/* Progress Bar */}
        <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-2 bg-red-500"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/pricing")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Go Home
          </button>
        </div>

      </motion.div>
    </div>
  );
}

export default PaymentFailer;