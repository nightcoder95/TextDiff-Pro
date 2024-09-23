'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const backgroundControls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      setMousePosition({ x: clientX, y: clientY })
      backgroundControls.start({
        backgroundImage: `radial-gradient(circle at ${clientX}px ${clientY}px, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.1) 25%, transparent 50%)`,
        transition: { type: 'spring', damping: 5, stiffness: 100 }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [backgroundControls])

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const typingTransition = {
    duration: 0.05,
    staggerChildren: 0.05
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={backgroundControls}
      />

      {/* About page navigation button */}
      <motion.div
        className="absolute top-4 right-4 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link href="/about" className="bg-transparent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 border border-white">
          About Us
        </Link>
      </motion.div>

      <main className="z-10 text-center">
        <motion.h1
          className="text-5xl font-bold mb-6"
          initial="hidden"
          animate="visible"
          variants={typingVariants}
          transition={typingTransition}
        >
          {"TextDiff Pro".split('').map((char, index) => (
            <motion.span key={index} variants={typingVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-xl mb-8 max-w-md"
          initial="hidden"
          animate="visible"
          variants={typingVariants}
          transition={typingTransition}
        >
          {"Compare texts with ease. Spot differences instantly.".split('').map((char, index) => (
            <motion.span key={index} variants={typingVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/compare" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Start Comparing
          </Link>
        </motion.div>
      </main>

      <motion.footer
        className="absolute bottom-4 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        © 2024 TextDiff Pro. All rights reserved.
      </motion.footer>
    </div>
  )
}