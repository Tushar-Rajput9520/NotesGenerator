import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateNotes } from "../services/api.js";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice.js";

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const dispatch= useDispatch()

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

 const handleSubmit = async () => {
  if (!topic.trim()) {
    setError("Please enter a topic");
    return;
  }

  try {
    setLoading(true);
    setError("");
    setResult(null);

    const response = await generateNotes({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    console.log("FULL RESPONSE:", response);

    const resultData = response?.data?.data || response?.data;
    const creditsLeft =
      response?.data?.creditsLeft ?? response?.creditsLeft;

    setResult(resultData);

    if (typeof creditsLeft === "number") {
      dispatch(updateCredits(creditsLeft));
    }

    // reset form
    setTopic("");
    setClassLevel("");
    setExamType("");
    setIncludeChart(false);
    setIncludeDiagram(false);
    setRevisionMode(false);

    setProgress(100);
    setProgressText("Completed!");
  } catch (err) {
    console.error("🔥 Error:", err);
    setError("Failed to generate notes");
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
};


  // Fake Smooth Progress Animation
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done...");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing the notes...");
      } else if (value > 40) {
        setProgressText("Processing content...");
      } else {
        setProgressText("Generating notes...");
      }

      setProgress(Math.floor(value));
    }, 700);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.75)] p-8 space-y-6 text-white"
    >
      {/* Topic */}
      <input
        type="text"
        placeholder="Enter topic (e.g. Web Development)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        disabled={loading}
        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
      />

      {/* Class */}
      <input
        type="text"
        placeholder="Enter class level (e.g. 12th)"
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
        disabled={loading}
        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
      />

      {/* Exam */}
      <input
        type="text"
        placeholder="Enter exam type (e.g. JEE, NEET)"
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
        disabled={loading}
        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
      />

      {/* Toggles */}
      <div className="flex flex-col md:flex-row md:gap-6 mt-4">
        <Toggle
          label="Revision Mode"
          checked={revisionMode}
          onChange={() => !loading && setRevisionMode(!revisionMode)}
        />
        <Toggle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => !loading && setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label="Include Chart"
          checked={includeChart}
          onChange={() => !loading && setIncludeChart(!includeChart)}
        />
      </div>

      {/* Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        className={`w-full mt-4 py-3 rounded-xl font-semibold transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {loading ? "Generating Notes..." : "Generate Notes"}
      </motion.button>

      {/* Progress Section */}
      {loading && (
        <div className="mt-4 space-y-2">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"
            />
          </div>

          <div className="flex justify-between text-xs text-gray-300">
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>

          <p className="text-xs text-gray-400 text-center">
            This may take up to 2–3 minutes. Please do not close or refresh.
          </p>
        </div>
      )}
    </motion.div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer"
      onClick={onChange}
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(34,197,94,0.35)"
            : "rgba(255,255,255,0.15)",
        }}
        className="relative w-12 h-6 rounded-full border border-white/20"
      >
        <motion.div
          layout
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white"
          style={{ left: checked ? "1.6rem" : "0.25rem" }}
        />
      </motion.div>

      <span className="text-sm">{label}</span>
    </div>
  );
}

export default TopicForm;
