'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Droplets, Zap, Wind, Flame, CheckCircle, Rocket, Building2 } from 'lucide-react'
import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import AnimatedGrid from '@/components/AnimatedGrid'
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
      subtitle: "HVAC Consulting",
      description: "We offer HVAC system consultancy service with consideration of safety, norms, environment benefits, as well as functional comfort.",
      color: "from-green-500 to-emerald-500",
      features: [
        "Consulting on required systems with respect to client and project requirements",
        "System adoption consulting aligned with building function and space criteria",
        "Heating and air conditioning system design focused on user comfort",
        "Ventilation system design for toilets, kitchens, laundry, and sewage treatment plants",
        "Pressurization of lift wells and staircases as per fire fighting norms",
        "Basement ventilation systems meeting fire safety requirements",
        "Strategic space planning for future air conditioning systems"
      ]
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Electrical Services",
      subtitle: "Electrical and Extra Low Voltage Consulting",
      description: "Comprehensive electrical design solutions ensuring safety, efficiency, and compliance with latest standards.",
      color: "from-yellow-500 to-orange-500",
      features: [
        "Electrical service design consulting tailored to client and project needs",
        "Space planning for transformers and DG sets per local norms and service providers",
        "Load requirement calculation and efficient load balancing",
        "Electrical load distribution and panel design consulting",
        "Building safety provisions including lightning arrestors and earthing pits",
        "Interior lighting and power distribution using latest trends",
        "Smoke detectors, fire alarms, CCTV, and internet services integration"
      ]
    },
    {
      icon: <Droplets className="w-12 h-12" />,
      title: "Plumbing Services",
      subtitle: "Plumbing Consulting",
      description: "Expert plumbing solutions from water supply to sewage disposal, ensuring efficient and sustainable systems.",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Water supply and sewage disposal scheme consulting",
        "Water storage to distribution planning aligned with building function",
        "Sewage collection network to disposal methodology consulting",
        "Sewage Treatment Plant planning and design",
        "Rainwater harvesting system integration",
        "Water treatment planning and implementation",
        "Sustainable plumbing solutions for optimal resource management"
      ]
    },
    {
      icon: <Flame className="w-12 h-12" />,
      title: "Fire Fighting Services",
      subtitle: "FFTG Consulting",
      description: "Comprehensive fire safety consulting ensuring compliance with local and international standards.",
      color: "from-red-500 to-pink-500",
      features: [
        "Fire fighting system consulting per local norms and standard regulations",
        "Detailed fire fighting requirement assessment",
        "Custom fire fighting system design and planning",
        "Project-specific safety solution development",
        "Compliance with NBC and local fire safety codes",
        "Integration of sprinkler, hydrant, and detection systems"
      ]
    }
  ]

  return (
    <main ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <AnimatedGrid />
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
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Wind className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
              </motion.div>

              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                What We Provide
              </motion.h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Comprehensive MEPF solutions delivered by experienced professionals. 
                We deliver unified solutions through our trusted associates in electrical, HVAC, 
                plumbing, and fire-fighting systems.
              </p>
            </MouseParallax>
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-12 sm:space-y-16 md:space-y-20"
          >
            {services.map((service, index) => (
              <div key={index}>
                <MouseParallax strength={5 + index * 2}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 30px 60px rgba(0,0,0,0.15)"
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="group"
                  >
                    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative">
                      {/* Animated corner glow */}
                      <motion.div
                        className={`absolute top-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity`}
                        style={{
                          background: `linear-gradient(to bottom right, ${service.color.includes('green') ? '#10b981' : service.color.includes('yellow') ? '#f59e0b' : service.color.includes('blue') ? '#3b82f6' : '#ef4444'}, transparent)`
                        }}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative z-10">
                    {/* Icon & Title Section */}
                    <motion.div 
                      className={`p-8 sm:p-10 md:p-12 bg-gradient-to-br ${service.color} text-white relative overflow-hidden`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Animated pattern background */}
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                        style={{
                          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                          backgroundSize: '40px 40px',
                        }}
                      />
                      
                      <div className="relative z-10">
                        <motion.div 
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-2xl"
                          whileHover={{ rotate: 360, scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="scale-90 sm:scale-100">
                            {service.icon}
                          </div>
                        </motion.div>
                        
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                          {service.title}
                        </h2>
                        
                        <div className="w-16 h-1 bg-white/50 rounded-full mb-4"></div>
                        
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold opacity-90 mb-4">
                          {service.subtitle}
                        </h3>
                        
                        <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Decorative element */}
                        <div className="mt-6 flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-white/40 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Features Section */}
                    <div className="md:col-span-2 p-8 sm:p-10 md:p-12 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                          <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full mr-4"></span>
                          Our Expertise
                        </h4>
                        <motion.div
                          className={`px-4 py-2 rounded-full bg-gradient-to-r ${service.color} text-white text-sm font-semibold shadow-lg`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {service.features.length} Services
                        </motion.div>
                      </div>
                      
                      <div className="grid gap-4">
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ x: 8, scale: 1.01 }}
                            className="flex items-start space-x-4 p-5 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group/item border border-transparent hover:border-gray-100"
                          >
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.5 }}
                              className="flex-shrink-0 mt-1"
                            >
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md`}>
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            </motion.div>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors flex-1">
                              {feature}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Decorative bottom element */}
                      <motion.div
                        className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-500"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-sm text-gray-700 italic">
                          💡 All services are tailored to meet specific project requirements and comply with local and international standards
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </MouseParallax>

            {/* Section Divider */}
            {index < services.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center my-12"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <motion.div
                  className={`mx-4 p-3 rounded-full bg-gradient-to-br ${service.color} shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {services[(index + 1) % services.length].icon}
                </motion.div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </motion.div>
            )}
          </div>
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
            <p className="text-lg sm:text-xl text-primary-100 mb-10 leading-relaxed max-w-2xl mx-auto">
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
