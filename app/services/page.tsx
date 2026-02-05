'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Droplets, Zap, Wind, Flame, CheckCircle, Rocket, Building2 } from 'lucide-react'
import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import MouseParallax from '@/components/MouseParallax'

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const services = [
    {
      icon: <Wind className="w-12 h-12" />,
      title: "Mechanical Service",
      subtitle: "Heating Ventilation and Air Conditioning (HVAC)",
      description: "Comprehensive HVAC system design and consultancy for optimal comfort, safety, and energy efficiency.",
      color: "from-green-500 to-emerald-500",
      features: [
        "Custom HVAC system design & consulting",
        "Air conditioning & heating solutions",
        "Ventilation for all building areas",
        "Basement & stairwell pressurization"
      ]
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Electrical Services",
      subtitle: "Power & Low Voltage Systems",
      description: "Complete electrical design services from power distribution to smart building integration.",
      color: "from-yellow-500 to-orange-500",
      features: [
        "Electrical load calculation & distribution",
        "Transformer & DG set planning",
        "Lighting design & power systems",
        "Fire alarms, CCTV & security integration"
      ]
    },
    {
      icon: <Droplets className="w-12 h-12" />,
      title: "Plumbing Services",
      subtitle: "Water & Drainage Systems",
      description: "Sustainable plumbing solutions covering water supply, sewage management, and treatment systems.",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Water supply & distribution design",
        "Sewage collection & disposal systems",
        "Sewage Treatment Plant (STP) design",
        "Rainwater harvesting solutions"
      ]
    },
    {
      icon: <Flame className="w-12 h-12" />,
      title: "Fire Fighting Services",
      subtitle: "Fire Safety & Protection",
      description: "Complete fire safety consulting with NBC compliance and advanced detection systems.",
      color: "from-red-500 to-pink-500",
      features: [
        "Fire safety system design & consulting",
        "NBC & local code compliance",
        "Sprinkler & hydrant systems",
        "Fire detection & alarm integration"
      ]
    }
  ]

  return (
    <main ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <ParticleField />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/80 to-primary-50/80 z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <MouseParallax strength={10}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-4 sm:mb-6"
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Wind className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
              </motion.div>

              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Our Services
              </motion.h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 text-left sm:text-justify">
                Comprehensive MEPF engineering solutions for modern infrastructure
              </p>
            </MouseParallax>
          </motion.div>

          {/* Services Grid - Compact Layout */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            {services.map((service, index) => (
              <MouseParallax key={index} strength={3}>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.12)"
                  }}
                  className="group h-full"
                >
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative h-full flex flex-col">
                    {/* Animated corner glow */}
                    <motion.div
                      className={`absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity`}
                      style={{
                        background: `linear-gradient(to bottom right, ${service.color.includes('green') ? '#10b981' : service.color.includes('yellow') ? '#f59e0b' : service.color.includes('blue') ? '#3b82f6' : '#ef4444'}, transparent)`
                      }}
                    />

                    {/* Header Section */}
                    <div className={`p-8 bg-gradient-to-br ${service.color} text-white relative overflow-hidden`}>
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                          backgroundSize: '30px 30px',
                        }}
                      />
                      
                      <div className="relative z-10 flex items-start space-x-4">
                        <motion.div 
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.icon}
                        </motion.div>
                        
                        <div className="flex-1">
                          <h2 className="text-xl sm:text-2xl font-bold mb-1">
                            {service.title}
                          </h2>
                          <h3 className="text-sm sm:text-base font-semibold opacity-90">
                            {service.subtitle}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="relative z-10 mt-4 text-sm sm:text-base text-white/95 leading-relaxed text-left sm:text-justify">
                        {service.description}
                      </p>
                    </div>

                    {/* Features Section */}
                    <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-1.5 h-6 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full mr-3"></span>
                        Key Services
                      </h4>
                      
                      <div className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.03 }}
                            whileHover={{ x: 5 }}
                            className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group/item"
                          >
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shadow-sm flex-shrink-0 mt-0.5`}>
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors text-left sm:text-justify">
                              {feature}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </MouseParallax>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-16 h-16 text-white" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg sm:text-xl text-primary-100 mb-10 leading-relaxed max-w-2xl mx-auto text-left sm:text-justify">
              Let our experts help you design efficient, safe, and sustainable MEPF systems for your next project. We're here to turn your vision into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold shadow-2xl hover:shadow-white/20 transition-all"
              >
                Contact Us Today
                <Rocket className="ml-2 w-5 h-5" />
              </motion.a>

              <motion.a
                href="/projects"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                View Our Projects
                <Building2 className="ml-2 w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
