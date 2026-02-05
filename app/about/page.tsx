'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, Target, Rocket, Award, CheckCircle } from 'lucide-react'
import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import AnimatedGrid from '@/components/AnimatedGrid'
import MouseParallax from '@/components/MouseParallax'

export default function About() {
  const containerRef = useRef<HTMLElement>(null!)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <main ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <AnimatedGrid />
      <ParticleField />

      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/80 to-primary-50/80 z-0"
          style={{ y }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <MouseParallax strength={15}>
              <motion.div
                className="inline-block mb-4 sm:mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl">
                  <Building2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </div>
              </motion.div>

              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto' }}>
                  About Us
                </span>
              </motion.h1>
            </MouseParallax>
          </motion.div>

          {/* Company Overview with Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16 sm:mb-20"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {[
                  { number: "18+", label: "Years Experience", icon: <Award className="w-8 h-8" /> },
                  { number: "700+", label: "Projects Delivered", icon: <Building2 className="w-8 h-8" /> },
                  { number: "100%", label: "Client Satisfaction", icon: <Target className="w-8 h-8" /> }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 group cursor-pointer"
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-semibold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="prose prose-lg max-w-none">
                <motion.h3 
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full mr-4"></span>
                  Who We Are
                </motion.h3>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-lg text-justify"
                  >
                    <span className="font-semibold text-primary-600">Trimity Consultants</span>, based in Ahmedabad, proudly delivers expert consulting services across India and internationally, with successful projects in South Africa and Saudi Arabia, specializing in comprehensive MEPF design, coordination, and execution.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-blue-50 to-primary-50 p-6 rounded-2xl border-l-4 border-primary-500"
                  >
                    <p className="text-base sm:text-lg text-justify">
                      Since our inception, we have successfully undertaken projects of varying sizes and complexities, providing tailored consulting solutions that meet diverse client needs. With a bold yet adaptable approach to industry trends, we continually integrate the latest technologies and methodologies into our workflow.
                    </p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-base sm:text-lg text-justify"
                  >
                    Our commitment to excellence ensures meticulous attention to every project, regardless of scale, striking the perfect balance between cost-effectiveness and system efficiency. This dedication has earned us the trust and loyalty of our clients, who remain our strongest advocates and a driving force behind new opportunities.
                  </motion.p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                    {[
                      "Residential Complexes",
                      "Industrial Facilities",
                      "Healthcare Centers",
                      "Shopping Complexes",
                      "Mid-Rise Towers",
                      "Commercial Spaces",
                      "Hospitality Projects",
                      "Mixed-Use Developments"
                    ].map((sector, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{sector}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-lg font-semibold text-gray-900 border-t-2 border-primary-200 pt-6 text-justify"
                  >
                    Our mission is to ensure the seamless and successful execution of every project, leaving clients not just satisfied, but confident in the value and reliability of our solutions.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            <MouseParallax strength={10}>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6 sm:space-y-8">

                {[
                  { 
                    icon: <Target className="w-10 h-10" />, 
                    title: "Our Vision", 
                    text: "At Trimity Consultants, our vision is to deliver design solutions that not only align perfectly with project requirements but also elevate the standards of our clients. We believe that thriving in the service industry requires an unwavering commitment to exceptional customer service. Our ultimate goal is to become the leading engineering consultancy, offering solutions that are both project-appropriate and client-focused, setting benchmarks for quality and reliability.",
                    color: "from-blue-500 to-cyan-500",
                    gradient: "from-blue-50 to-cyan-50"
                  },
                  { 
                    icon: <Rocket className="w-10 h-10" />, 
                    title: "Our Mission", 
                    text: "Our mission is twofold: to consistently provide exceptional services to our clients while driving the growth of Trimity Consultants. With a growing base of satisfied clients, we aim to establish delivery centers across India, expanding the reach and impact of our services. By implementing standardized processes and procedures, we are committed to enhancing the quality and efficiency of the solutions we deliver, ensuring unmatched value for every client.",
                    color: "from-primary-500 to-blue-600",
                    gradient: "from-primary-50 to-blue-50"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="mt-0"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    <div className={`p-8 sm:p-10 bg-gradient-to-br ${item.gradient} rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-all duration-500`}>
                      {/* Decorative Elements */}
                      <motion.div
                        className="absolute -top-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-start space-x-5 mb-6">
                          <motion.div
                            className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
                            whileHover={{ scale: 1.05, y: -3 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          
                          <div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <div className={`w-20 h-1 bg-gradient-to-r ${item.color} rounded-full`}></div>
                          </div>
                        </div>

                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
            </MouseParallax>

            {/* Founder Section */}
            <MouseParallax strength={8}>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:sticky md:top-32 space-y-6 sm:space-y-8"
              >
                {/* Founder Card */}
                <motion.div 
                  className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-50 via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <motion.div
                        className="inline-block p-1 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-white rounded-full p-1">
                          <img 
                            src="/projects/founder.jpg"
                            alt="Mr. Ketul Lathia"
                            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover"
                          />
                        </div>
                      </motion.div>

                      <motion.h2 
                        className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                      >
                        Mr. Ketul Lathia
                      </motion.h2>

                      <motion.div
                        className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-lg mb-6"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                      >
                        IGBC Accredited Professional (IGBC-AP)
                      </motion.div>
                    </div>

                    {/* Founder Intro */}
                    <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                      <p className="text-gray-700 leading-relaxed text-center">
                        <span className="font-semibold text-gray-900">Visionary Founder & Leader</span> of Trimity Consultants with expertise in value engineering, timely project delivery, and client-centric solutions.
                      </p>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-1 h-5 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full mr-3"></span>
                        Leadership Excellence
                      </h4>
                      {[
                        "Expert in MEPF design & execution across diverse sectors",
                        "Strong focus on effective communication & team collaboration",
                        "Hands-on involvement in design workflows & quality control",
                        "Member of Indian Plumbing & Fire Safety Associations",
                        "Committed to sustainable building practices (IGBC-AP)"
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-transparent hover:from-primary-50 hover:to-transparent transition-all group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 group-hover/item:text-gray-900 transition-colors">
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <motion.div
                      className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-primary-500 to-blue-600 text-white relative overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute top-0 left-0 text-8xl opacity-10 font-serif">"</div>
                      <p className="relative z-10 text-sm sm:text-base leading-relaxed italic">
                        Under his technically proficient and dynamic leadership, Team Trimity continues to exceed industry expectations, delivering excellence at every step.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </MouseParallax>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
