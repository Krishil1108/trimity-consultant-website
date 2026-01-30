'use client'

import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Building2 className="w-8 h-8 text-primary-400" />
          <span className="text-2xl font-bold">Trimity Consultants</span>
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
