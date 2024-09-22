"use client"

import React, { useState } from 'react'
import { diffWords } from 'diff'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ParagraphComparisonComponent() {
  const [paragraph1, setParagraph1] = useState('')
  const [paragraph2, setParagraph2] = useState('')
  const [diff, setDiff] = useState([])
  const [isCompared, setIsCompared] = useState(false)

  const handleCompare = () => {
    const differences = diffWords(paragraph1, paragraph2)
    setDiff(differences)
    setIsCompared(true)
  }

  return (
    (<div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Paragraph Comparison Tool</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Paragraph 1</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter the first paragraph here"
              value={paragraph1}
              onChange={(e) => setParagraph1(e.target.value)}
              rows={5}
              className="w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Paragraph 2</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter the second paragraph here"
              value={paragraph2}
              onChange={(e) => setParagraph2(e.target.value)}
              rows={5}
              className="w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center mb-8">
        <Button onClick={handleCompare} size="lg">
          Compare Paragraphs
        </Button>
      </div>
      {isCompared && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paragraph 1 (Original)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{paragraph1}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paragraph 2 (With Differences Highlighted)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {diff.map((part, index) => (
                  <span
                    key={index}
                    className={
                      part.added
                        ? 'bg-green-200 p-1 rounded'
                        : part.removed
                        ? 'bg-red-200 p-1 rounded line-through'
                        : ''
                    }>
                    {part.value}
                  </span>
                ))}
              </p>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              <span className="inline-block bg-green-200 p-1 rounded mr-2">Green</span> indicates added text
              <span className="inline-block bg-red-200 p-1 rounded line-through ml-4 mr-2">Red</span> indicates removed text
            </p>
          </div>
        </div>
      )}
    </div>)
  );
}