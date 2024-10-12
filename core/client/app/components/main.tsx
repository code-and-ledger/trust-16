"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface MainProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ width = '80vw', height = '70vh', children }) => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex
                 bg-gradient-to-r from-body to-text bg-[length:100%_2px] bg-no-repeat bg-[0_0]
                 border-l-2 border-l-body
                 border-r-2 border-r-text
                 z-10 relative"
      style={{ width, height }}
      initial={{ height: 0, width: 0 }}
      animate={{ height, width }}
      transition={{ type: 'spring', duration: 2, delay: 1 }}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-body to-text"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ type: 'spring', duration: 2, delay: 1 }}
      />
    </motion.div>
  )
}

export default Main