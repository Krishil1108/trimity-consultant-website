'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, Target, Rocket, Award } from 'lucide-react'
import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import AnimatedGrid from '@/components/AnimatedGrid'
import MouseParallax from '@/components/MouseParallax'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <main ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <AnimatedGrid />
      <ParticleField />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/80 to-primary-50/80 z-0"
          style={{ y }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <MouseParallax strength={15}>
              <motion.div
                className="inline-block mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-2xl">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto' }}>
                  Know More About Us
                </span>
              </motion.h1>
            </MouseParallax>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <MouseParallax strength={10}>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="space-y-4 text-gray-600 leading-relaxed text-lg"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                >
                  {[
                    "Trimity Consultants, based in Ahmedabad, proudly delivers expert consulting services across India, specializing in comprehensive MEPF design, coordination, and execution.",
                    "Since our inception, we have successfully undertaken projects of varying sizes and complexities, providing tailored consulting solutions that meet diverse client needs. With a bold yet adaptable approach to industry trends, we continually integrate the latest technologies and methodologies into our workflow.",
                    "Our commitment to excellence ensures meticulous attention to every project, regardless of scale, striking the perfect balance between cost-effectiveness and system efficiency. This dedication has earned us the trust and loyalty of our clients, who remain our strongest advocates and a driving force behind new opportunities.",
                    "At Trimity, innovation and quality define us. We prioritize delivering cost-effective solutions without compromising on excellence, catering to a broad spectrum of sectors including residential, industrial, healthcare, shopping complexes, mid-rise towers, commercial spaces, and hospitality.",
                    "Our mission is to ensure the seamless and successful execution of every project, leaving clients not just satisfied, but confident in the value and reliability of our solutions."
                  ].map((text, idx) => (
                    <motion.p
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ x: 10, color: 'rgb(55, 65, 81)' }}
                      transition={{ duration: 0.3 }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </motion.div>

                {[
                  { 
                    icon: <Target className="w-8 h-8" />, 
                    title: "Our Vision", 
                    text: "At Trimity Consultants, our vision is to deliver design solutions that not only align perfectly with project requirements but also elevate the standards of our clients. We believe that thriving in the service industry requires an unwavering commitment to exceptional customer service. Our ultimate goal is to become the leading engineering consultancy, offering solutions that are both project-appropriate and client-focused, setting benchmarks for quality and reliability.",
                    color: "from-blue-500 to-cyan-500"
                  },
                  { 
                    icon: <Rocket className="w-8 h-8" />, 
                    title: "Our Mission", 
                    text: "Our mission is twofold: to consistently provide exceptional services to our clients while driving the growth of Trimity Consultants. With a growing base of satisfied clients, we aim to establish delivery centers across India, expanding the reach and impact of our services. By implementing standardized processes and procedures, we are committed to enhancing the quality and efficiency of the solutions we deliver, ensuring unmatched value for every client.",
                    color: "from-primary-500 to-blue-600"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="mt-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                    }}
                  >
                    <motion.div
                      className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${item.color}`}
                      initial={{ height: 0 }}
                      whileInView={{ height: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 + 0.3, duration: 0.6 }}
                    />

                    <div className="flex items-center space-x-4 mb-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    </div>

                    <p className="text-gray-700 leading-relaxed pl-16">
                      {item.text}
                    </p>

                    <motion.div
                      className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-100/50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </MouseParallax>

            {/* Founder Section */}
            <MouseParallax strength={8}>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="sticky top-32 space-y-8"
              >
                <motion.div 
                  className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 3,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Decorative corner */}
                  <motion.div
                    className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary-200/30 to-transparent rounded-bl-full"
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <motion.h2 
                      className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      Mr. Ketul Lathia
                    </motion.h2>

                    <motion.div
                      className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold mb-6 shadow-lg"
                      whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                    >
                      IGBC Accredited Professional (IGBC-AP)
                    </motion.div>

                    <div className="space-y-4">
                      {[
                        { icon: <Award className="w-6 h-6" />, text: "21+ years in MEPF design and execution" },
                        { icon: <Building2 className="w-6 h-6" />, text: "250+ projects successfully delivered" },
                        { icon: <Target className="w-6 h-6" />, text: "Specialized in sustainable building practices" }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ 
                            x: 10, 
                            backgroundColor: 'rgba(59, 130, 246, 0.05)'
                          }}
                        >
                          <motion.div
                            className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.icon}
                          </motion.div>
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors font-medium">
                            {item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.p 
                      className="mt-6 text-gray-600 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      With more than two decades of expertise in the industry and a proven track record 
                      of delivering over 250 projects, Mr. Lathia founded Trimity Consultants 13+ years 
                      ago, driven by a commitment to providing innovative and sustainable engineering 
                      solutions. Under his leadership, Trimity continues to set new benchmarks in MEPF 
                      consulting excellence.
                    </motion.p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src="https://lh3.googleusercontent.com/sitesv/APaQ0SRK-MAaXWFOx4bl5fOVPCrEuX6d4vPYrWL0Qm6zJm9thagop-SjzzsfdpQH29BEIGSb5yHCbfeID2XD-iV7v8a4tTsb9PFg9pDUxF8ALpMnnsbXQ9VywAm2YeYpWAD5k8deEewBAsXxJlj9YX_6s0MsSLWIxGqbNzpwGyA0Rj98D8gNfwUuYDu0ziH1EAsEjEfzRszYKFoCcqfGxJ_rLezIFZOpfe1ysF8X=w1280"
                    alt="About Trimity Consultants"
                    className="w-full h-auto"
                  />
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
