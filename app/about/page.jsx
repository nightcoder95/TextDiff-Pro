"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const developers = [
    {
        name: "Bharat Harikumar",
        photo: "/dp.png",
        profession: "Full Stack Developer",
        contribution:
        "Architectural design and implementation of Text Comparison Algorithm, leading performance optimization efforts, and developing scalable backend infrastructure",
        },
        {
        name: "Anandhu Gopinath",
        photo: "/anandhu.jpeg",
        profession: "Full Stack Developer",
        contribution:
        "Co-developing Text Comparison Algorithm, optimizing frontend performance, and collaborating on backend development for seamless user experience",
        },
        {
        name: "Abhijith Suresh",
        photo: "/abhijit.png",
        profession: "Frontend Developer",
        contribution:
        "Conceptualizing and designing the UI, driving project vision and direction, and leading idea management and requirements gathering",
        },
];

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.1) 25%, transparent 50%)`,
        }}
        transition={{ type: "spring", damping: 10 }}
      />

      <main className="z-10 text-center px-4 py-8">
        <motion.h1
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          About TextDiff Pro
        </motion.h1>
        <motion.p
          className="text-xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          Meet the talented developers behind TextDiff Pro, who have worked
          tirelessly to bring you the best text comparison tool.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.name}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}>
              <Image
                src={dev.photo}
                alt={dev.name}
                width={200}
                height={200}
                className="bg-blue-100 rounded-full mx-auto mb-4 size-[14rem] object-contain"
              />
              <h2 className="text-2xl font-bold mb-2">{dev.name}</h2>
              <p className="text-blue-400 mb-2">{dev.profession}</p>
              <p className="text-gray-400">{dev.contribution}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Back to Home
          </Link>
        </motion.div>
      </main>

      <motion.footer
        className="absolute bottom-4 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}>
        © 2024 TextDiff Pro. All rights reserved.
      </motion.footer>
    </div>
  );
}
