import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const links = [
    { name: "Notes", path: "/notes" },
    { name: "History", path: "/history" },
    { name: "Pricing", path: "/pricing" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative z-10 mx-6 mt-32 mb-10 rounded-3xl
      bg-gradient-to-br from-black/90 via-black/80 to-black/90
      backdrop-blur-2xl border border-white/10
      shadow-[0_25px_80px_rgba(0,0,0,0.8)]
      px-10 py-14 text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r 
        from-purple-500/10 via-blue-500/10 to-pink-500/10 
        blur-3xl opacity-30 pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LEFT */}
        <motion.div
          whileHover={{ y: -8, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3">
            <motion.img
              src={logo}
              alt="logo"
              className="h-10 w-10 object-contain"
              whileHover={{ rotate: 12 }}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              ExamNotes <span className="text-gray-400">AI</span>
            </span>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Generate exam-focused notes, smart diagrams and printable PDFs 
            powered by artificial intelligence.
          </p>

          <div className="flex gap-4 mt-2">
  {[
    { icon: FaGithub, link: "https://github.com/Tushar-Rajput9520" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/tushar-singh-068426257/" },
    { icon: FaInstagram, link: "https://www.instagram.com/tushar_rajput_._._/" },
  ].map((item, i) => {
    const Icon = item.icon;
    return (
      <motion.a
        key={i}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4, scale: 1.2 }}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        <Icon size={18} />
      </motion.a>
    );
  })}
</div>

        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-lg font-semibold mb-2">
            Quick Links
          </h2>

          <ul className="space-y-3 text-sm">
            {links.map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6 }}
                onClick={() => navigate(item.path)}
                className="text-gray-300 hover:text-white transition cursor-pointer"
              >
                {item.name}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-lg font-semibold mb-2">
            Contact
          </h2>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>support@examnotes.ai</li>
            <li>+91 9520554564</li>
            <li>India</li>
          </ul>
        </motion.div>

      </div>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1 }}
        className="h-px bg-gradient-to-r 
        from-transparent via-white/30 to-transparent my-10"
      />

      <div className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
        <p className="text-gray-400">
  Made with ❤️ by{" "}
  <a
    href="https://www.linkedin.com/in/tushar-singh-068426257/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:underline"
  >
    Tushar Singh
  </a>
</p>

      </div>
    </motion.footer>
  );
}

export default Footer;
