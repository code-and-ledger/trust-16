"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Shield, Zap, Target, Compass, Star } from 'lucide-react'

interface AnswerHistoryProps {
  answers?: ('trust' | 'bail')[]
}

function AnswerHistory({ answers = [] }: AnswerHistoryProps) {
  const [visibleAnswers, setVisibleAnswers] = useState<('trust' | 'bail')[]>([])
  const filledAnswers = [...answers, ...Array(16).fill('bail')].slice(0, 16)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleAnswers(filledAnswers)
    }, 500)
    return () => clearTimeout(timer)
  }, [filledAnswers])

  return (
    <div className=" flex flex-col ">
      <motion.div 
        className="grid grid-cols-4 gap-1 w-48 h-48 transform rotate-90 mx-auto"
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{ rotate: 45, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {visibleAnswers.map((answer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              whileHover={{ scale: 1.1, rotate: 20, transition: { duration: 0.2 } }}
              className={`w-10 h-10 border border-black relative overflow-hidden ${
                answer === 'trust' ? 'bg-gray-100' : 'bg-black'
              }`}
            >
              <motion.div 
                className="w-[141%] h-[141%] absolute top-1/2 left-1/2 -translate-x-1/6 -translate-y-1/6 grid grid-cols-3 grid-rows-3"
                animate={{
                  rotate: [0, 360],
                  x: [-50, 0, -50],
                  y: [-20, 0, -20],
                }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`border-[1px] ${
                      answer !== 'trust' ? 'border-white opacity-40' : 'border-black opacity-15'
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

interface FeatureButtonProps {
  icon: React.ReactNode
  label: string
  color: string
  position: string
}

function FeatureButton({ icon, label, color, position }: FeatureButtonProps) {
  return (
    <motion.button
      className={`absolute ${position} flex items-center justify-center p-2 rounded-full text-white`}
      style={{ backgroundColor: color }}
    //   whileHover={{ scale: 1.1 }}
    >
      <div className="relative">
        {icon}
        <motion.div
          className="absolute inset-0 rounded-full bg-white opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <span className="ml-2 text-sm font-bold">{label}</span>
    </motion.button>
  )
}

export default function PlayerDashboard() {
  const [answers, setAnswers] = useState<('trust' | 'bail')[]>([])

  useEffect(() => {
    const initialAnswers: ('trust' | 'bail')[] = [
      'trust', 'bail', 'trust', 'trust',
      'bail', 'trust', 'bail', 'trust',
      'trust', 'bail', 'trust', 'bail',
      'bail', 'trust', 'bail', 'trust'
    ]
    
    const timer = setInterval(() => {
      setAnswers(prev => {
        if (prev.length < initialAnswers.length) {
          return initialAnswers.slice(0, prev.length + 1)
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center ">
    <div className="relative ">
      <motion.div 
        className="w-full h-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative ">
            <AnswerHistory answers={answers} />
            <FeatureButton 
              icon={<Sparkles size={24} />} 
              label="Power Up" 
              color="#626262FF" 
              position="top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg]"
            />
            <FeatureButton 
              icon={<Compass size={24} />} 
              label="Navigation" 
              color="#000000FF" 
              position="top-0 right-0 translate-x-1/2 -translate-y-1/2 rotate-[45deg]"
            />
            <FeatureButton 
              icon={<Zap size={24} />} 
              label="AI predict" 
              color="#626262FF" 
              position="bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-[-45deg]"
            />
            <FeatureButton 
              icon={<Target size={24} />} 
              label="Hide bails" 
              color="#000000FF" 
              position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rotate-[45deg]"
            />



          </div>
        </motion.div>
      </div>
    </div>
  )
}