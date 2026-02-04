'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Image 
            src="/logo.jpg" 
            alt="Trimity Consultants Logo" 
            width={200} 
            height={70}
            className="h-14 w-auto"
          />
        </div>
        <p className="text-gray-400 mb-4">
          Engineering Excellence Since 2019
        </p>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Trimity Consultants. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
