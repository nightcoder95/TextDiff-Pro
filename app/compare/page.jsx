"use client"

import React, { useState } from 'react'
import { diffWords } from 'diff'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'

export default function ParagraphComparison() {
  const [paragraph1, setParagraph1] = useState('')
  const [paragraph2, setParagraph2] = useState('')
  const [diff, setDiff] = useState([])
  const [isCompared, setIsCompared] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleCompare = () => {
    const differences = diffWords(paragraph1, paragraph2)
    setDiff(differences)
    setIsCompared(true)
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <div className="p-10 mx-10 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-300 ">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-center text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Paragraph Comparison
          </motion.h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-300">Input 1</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter the first input data to compare"
                value={paragraph1}
                onChange={(e) => setParagraph1(e.target.value)}
                rows={5}
                className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-300">Input 2</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter the second input data"
                value={paragraph2}
                onChange={(e) => setParagraph2(e.target.value)}
                rows={5}
                className="w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            onClick={handleCompare} 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Compare Texts
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.span>
          </Button>
        </motion.div>

        {isCompared && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-300">Original Text</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-gray-300">{paragraph1}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-300">Modified Text (Differences Highlighted)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-gray-300">
                  {diff.map((part, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={
                        part.added
                          ? 'bg-green-700 text-white p-1 rounded'
                          : part.removed
                          ? '' // Do not show removed text in Modified Text section
                          : ''
                      }
                    >
                      {part.added || !part.removed ? part.value : null}
                    </motion.span>
                  ))}
                </p>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                <span className="inline-block bg-green-700 text-white p-1 rounded mr-2">Green</span> indicates differences.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}