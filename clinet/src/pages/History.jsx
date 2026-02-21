import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo.png";
import FinalResult from "../components/FinalResult";

function History() {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);
  const credits = userData?.credits ?? 0;

  const [topics, setTopics] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeId, setActiveId] = useState(null);

  /* ---------------- FETCH NOTES ---------------- */
  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(
          serverUrl + "/api/notes/getnotes",
          { withCredentials: true }
        );
        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log("Fetch Notes Error:", error);
      }
    };
    myNotes();
  }, []);

  /* ---------------- OPEN NOTE ---------------- */
  const openNote = async (noteId) => {
    setLoading(true);
    setActiveId(noteId);

    try {
      const res = await axios.get(
        serverUrl + `/api/notes/${noteId}`,
        { withCredentials: true }
      );

      setSelectedNote(res.data.content);

      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    } catch (err) {
      console.log("Error opening note:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RESPONSIVE SIDEBAR ---------------- */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-6 py-6 sm:py-8">

      {/* ---------------- HEADER ---------------- */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
      >
        {/* Logo */}
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
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              ExamNotes <span className="text-gray-400">AI</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-300 -mt-1">
              AI powered exam-oriented notes & revision
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {!isSidebarOpen && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(true)}
              className="px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm"
            >
              <GiHamburgerMenu />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/pricing")}
            className="px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center gap-2 text-sm"
          >
            💎 {credits}
          </motion.button>
        </div>
      </motion.header>

      {/* ---------------- GRID ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">

        {/* Mobile Overlay */}
        {isSidebarOpen && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ---------------- SIDEBAR ---------------- */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="
                fixed lg:static
                inset-y-0 left-0
                w-72 sm:w-80 lg:w-auto
                h-full lg:h-[75vh]
                z-50 lg:z-auto
                rounded-none lg:rounded-lg
                bg-black/95 lg:bg-black/80
                backdrop-blur-xl
                border border-white/10
                shadow-[0_20px_45px_rgba(0,0,0,0.6)]
                p-4 sm:p-5
                overflow-y-auto
              "
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-white mb-4"
              >
                ← Back
              </button>

              <button
                onClick={() => navigate("/notes")}
                className="w-full px-3 py-2 rounded-lg text-sm text-gray-200 bg-white/10 hover:bg-white/20 transition mb-4"
              >
                ➕ New Notes
              </button>

              <hr className="border-white/10 mb-4" />

              <h2 className="text-lg font-bold text-white mb-4">
                📜 Your Notes
              </h2>

              <ul className="space-y-3"> {topics.map((t) => ( <li key={t._id} onClick={() => openNote(t._id)} className="cursor-pointer rounded-xl p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200" > <p className="text-sm font-semibold text-white"> {t.topic} </p> <div className="flex flex-wrap gap-2 mt-2 text-xs"> {t.classLevel && ( <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300"> 🎓 Class: {t.classLevel} </span> )} {t.examType && ( <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300"> 📝 {t.examType} </span> )} </div> <div className="flex gap-3 mt-2 text-xs text-gray-300"> {t.revisionMode && <span>⚡ Revision</span>} {t.includeDiagram && <span>📊 Diagram</span>} {t.includeChart && <span>📈 Chart</span>} </div> </li> ))} </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- MAIN CONTENT ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 rounded-xl sm:rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-4 sm:p-6 min-h-[60vh] sm:min-h-[75vh]"
        >
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {!loading && !selectedNote && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p className="text-base sm:text-lg">
                Select a topic from the Sidebar
              </p>
              <p className="text-sm mt-2">
                Your note will appear here ✨
              </p>
            </div>
          )}

          {!loading && selectedNote && (
            <FinalResult result={selectedNote} />
          )}
        </motion.div>

      </div>
    </div>
  );
}

export default History;