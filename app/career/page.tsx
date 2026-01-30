'use client'

import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Be part of a dynamic team delivering engineering excellence across India. 
              At Trimity Consultants, we value innovation, dedication, and professional growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Explore Opportunities
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              We're always looking for talented professionals to join our growing team. 
              Get in touch to discuss career opportunities.
            </p>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold shadow-lg cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
