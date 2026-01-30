'use client'

import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Wrench } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Blogs() {
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
              Insights & Updates
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Stay tuned for industry insights, project updates, and engineering best practices
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <BookOpen className="w-10 h-10" />,
                title: "Industry Insights",
                description: "Latest trends in MEPF engineering"
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: "Project Updates",
                description: "Success stories and case studies"
              },
              {
                icon: <Wrench className="w-10 h-10" />,
                title: "Best Practices",
                description: "Engineering tips and techniques"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 p-12 bg-gradient-to-br from-primary-50 to-white rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600">
              We're preparing valuable content to help you stay informed about the latest 
              developments in engineering consulting and MEPF solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
