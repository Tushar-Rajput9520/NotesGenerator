import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { getCurentUser } from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {

    getCurentUser(dispatch);

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };

  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-black dark:to-gray-800 px-6">

      {/* Floating Glow Effect */}
      <div className="absolute w-72 h-72 bg-green-400/20 blur-3xl rounded-full animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-green-200 dark:border-gray-700"
      >

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-green-500 text-7xl mb-6 flex justify-center"
        >
          <FiCheckCircle />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-green-600"
        >
          Payment Successful 🎉
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 dark:text-gray-300 mt-3"
        >
          Your credits have been added to your account.
        </motion.p>

        {/* Countdown */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-500 mt-4"
        >
          Redirecting to home in <span className="font-semibold">{seconds}</span> seconds...
        </motion.p>

        {/* Progress Bar */}
        <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-2 bg-green-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Go to Dashboard
        </button>

      </motion.div>
    </div>
  );
}

export default PaymentSuccess;