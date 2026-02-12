'use client'

import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'

export default function Career() {
  const values = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Collaborative Culture",
      description: "Work with a dynamic team delivering engineering excellence"
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Growth Opportunities",
      description: "Expand your skills across diverse projects and sectors"
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Innovation Focus",
      description: "Be part of cutting-edge engineering solutions"
    }
  ]

  return (
    <main className="min-h-screen bg-white relative">
      <Navigation />
      <ParticleField />

      <section className="relative z-10 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Join Our Team
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12 px-4">
              Be part of a dynamic team delivering engineering excellence across India. 
              At Trimity Consultants, we value innovation, dedication, and professional growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 1.02 }}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
                  <div className="scale-75 sm:scale-90 md:scale-100">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 text-white"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Explore Opportunities
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8">
              We're always looking for talented professionals to join our growing team. 
              Get in touch to discuss career opportunities.
            </p>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-lg font-semibold shadow-lg cursor-pointer text-sm sm:text-base"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
