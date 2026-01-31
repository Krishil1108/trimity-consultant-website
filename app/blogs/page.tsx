'use client'

import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Wrench } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Blogs() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Insights & Updates
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12 px-4">
              Stay tuned for industry insights, project updates, and engineering best practices
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
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
                whileTap={{ scale: 1.02 }}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
                  <div className="scale-75 sm:scale-90 md:scale-100">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 sm:mt-12 md:mt-16 p-8 sm:p-10 md:p-12 bg-gradient-to-br from-primary-50 to-white rounded-xl sm:rounded-2xl"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Coming Soon
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
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
