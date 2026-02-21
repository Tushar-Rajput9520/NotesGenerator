import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import TopicForm from "../components/TopicForm";
import Sidebar from "../components/Sidebar";
import FinalResult from "../components/FinalResult";

function Notes() {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);
  const credits = userData?.credits ?? 0;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-8">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-8 sm:my-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 sm:px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-3"
        >
          <img
            src={logo}
            alt="examnotes"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
          />

          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              ExamNotes <span className="text-gray-400">AI</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 -mt-1">
              AI powered exam-oriented notes & revision
            </p>
          </div>
        </div>

        {/* HEADER BUTTONS */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* CREDIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250 }}
            onClick={() => navigate("/pricing")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center gap-2 rounded-full text-sm text-white"
          >
            <span className="text-lg">💎</span>
            <span>{credits}</span>

            <motion.span
              whileHover={{ rotate: 90 }}
              className="ml-1 h-5 w-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold"
            >
              ➕
            </motion.span>
          </motion.button>

          {/* HISTORY BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/history")}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
          >
            📒 Your Notes
          </motion.button>
        </div>
      </motion.header>

      {/* FORM SECTION */}
      <motion.div className="mb-12 space-y-6">
        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl">
            {error}
          </div>
        )}

        {/* FORM */}
        <motion.div className="mb-12">
          <TopicForm
            loading={loading}
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
          />
        </motion.div>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="mb-6 text-center text-gray-300 font-medium"
          >
            Generating exam-focused notes...
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center text-red-500 font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* RESULT SECTION */}
        {!result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className=" h-64 mt-6 p-6 rounded-2xl bg-white shadow-lg border flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg boder border-dashed border-gray-300 text-gray-500 shadow-inner"
          >
            <span className="text-4xl mb-3">📘</span>
            <p className="text-sm">Generated notes will appear here</p>
          </motion.div>
        )}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:grid lg:grid-cols-4 gap-6"
          >
            <div className="lg:col-span-1">
              <Sidebar result={result} />
            </div>
            <div className="lg:col-span-3 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6">
              <FinalResult result={result} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Notes;
