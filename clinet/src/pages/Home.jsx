import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import img from "../assets/img1.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen overflow-hidden bg-white text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
            className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-extrabold leading-tight 
  bg-gradient-to-br from-black/90 via-black/60 to-black/90 
  bg-clip-text text-transparent"
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
            >
              Create Smart <br /> AI Notes in Seconds
            </motion.h1>
            <motion.p
              whileHover={{ y: -2 }}
              className="mt-6 max-w-xl text-lg 
  bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-400 
  bg-clip-text text-transparent"
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)",
              }}
            >
              Generate exam-focused notes, project documentation, flow diagrams
              and revision-ready content using AI – faster, cleaner and smarter.
            </motion.p>
            

            {/* Content here */}
          </motion.div>
          <motion.button
              onClick={()=>navigate("/notes")}
              whileHover={{
                y: -10,
                rotateX: 8,
                rotateY: -8,
                scale: 1.07,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white font-semiboldI.  text-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
            >
              Get Started{" "}
            </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{
            y: -12,
            rotateX: 8,
            rotateY: -8,
            scale: 1.05,
          }}
          className="transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="overflow-hidden">
            <img
              src={img}
              alt="AI Notes"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </section>
      <section className="max-w-6xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10" >
       <Feature 
    icon="📘"
    title="Exam Notes"
    desc="High-yield, revision-ready exam-oriented notes."
  />
  <Feature 
    icon="📂"
    title="Project Notes"
    desc="Well-structured documentation for assignments & projects."
  />

  <Feature 
    icon="📊"
    title="Charts & Graphs"
    desc="Auto-generated diagrams, charts and flow graphs."
  />

  <Feature 
    icon="📥"
    title="Free PDF Download"
    desc="Download clean, formatted notes instantly."
  />
      </section>
      <Footer />
    </div>
  );
}
function Feature({ icon,title,desc}){
  return (
    <motion.div
    whileHover={{
            y:-12,
            rotateX:8,
            rotateY:-8,
            scale:1.05
          }}
          
          transition={{type:"spring",stiffness:200,damping:18 }} className="relative rounded-2xl p-6 bg-gradient-to-br from-black/90 via-black/80  to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)] text-white" sytle={{ transformStyle:"preserve-3d"}}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opaciy-100 transition-opacity pointer-events-none"></div>
            <div className="relative z-10 " style={{transform:"translateZ(30px)"}}>
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
              </div>
      
    </motion.div>
  )
}

export default Home;
