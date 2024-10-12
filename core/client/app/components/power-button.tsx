import React from 'react'
import Link from 'next/link'
import { Button } from "./ui/button"

const PowerBtn = ({ width, height, fill }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C11.4477 2 11 2.44772 11 3V11C11 11.5523 11.4477 12 12 12C12.5523 12 13 11.5523 13 11V3C13 2.44772 12.5523 2 12 2Z" fill={fill} />
    <path d="M7.75735 6.34315C7.36683 5.95262 6.73367 5.95262 6.34314 6.34315C5.95262 6.73367 5.95262 7.36684 6.34314 7.75736L7.75735 9.17157C8.14788 9.5621 8.78104 9.5621 9.17157 9.17157C9.56209 8.78105 9.56209 8.14788 9.17157 7.75736L7.75735 6.34315Z" fill={fill} />
    <path d="M16.2426 6.34315C16.6332 5.95262 17.2663 5.95262 17.6569 6.34315C18.0474 6.73367 18.0474 7.36684 17.6569 7.75736L16.2426 9.17157C15.8521 9.5621 15.219 9.5621 14.8284 9.17157C14.4379 8.78105 14.4379 8.14788 14.8284 7.75736L16.2426 6.34315Z" fill={fill} />
    <path d="M12 14C15.3137 14 18 16.6863 18 20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20C6 16.6863 8.68629 14 12 14Z" fill={fill} />
  </svg>
)

const PowerButton = () => {
  return (
    <Button
      asChild
      variant="outline"
      className="fixed top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-background border border-primary p-1 flex justify-center items-center z-30 hover:bg-green-300 hover:shadow-[0_0_8px_6px_rgba(0,255,0,0.2)]"
    >
      <Link href="/">
        <PowerBtn width={30} height={30} fill="currentColor" />
      </Link>
    </Button>
  )
}

export default PowerButton