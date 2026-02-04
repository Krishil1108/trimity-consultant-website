'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, ArrowRight, Zap, Droplets, Wind, Flame } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import AnimatedGrid from '@/components/AnimatedGrid'
import MouseParallax from '@/components/MouseParallax'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  const services = [
    { 
      icon: <Wind className="w-12 h-12" />, 
      title: "HVAC Systems", 
      description: "Complete heating, ventilation, and air conditioning solutions",
      color: "from-green-400 to-emerald-500" 
    },
    { 
      icon: <Zap className="w-12 h-12" />, 
      title: "Electrical Design", 
      description: "Comprehensive electrical and low voltage consulting",
      color: "from-yellow-400 to-orange-500" 
    },
    { 
      icon: <Droplets className="w-12 h-12" />, 
      title: "Plumbing Solutions", 
      description: "Expert water supply and sewage management systems",
      color: "from-blue-400 to-cyan-500" 
    },
    { 
      icon: <Flame className="w-12 h-12" />, 
      title: "Fire Safety", 
      description: "Advanced fire fighting and detection systems",
      color: "from-red-400 to-pink-500" 
    }
  ]

  return (
    <main ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatedGrid />
          <ParticleField />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-primary-50"
            animate={{
              background: [
                'linear-gradient(to bottom right, rgb(239, 246, 255), rgb(255, 255, 255), rgb(239, 246, 255))',
                'linear-gradient(to bottom right, rgb(219, 234, 254), rgb(255, 255, 255), rgb(219, 234, 254))',
                'linear-gradient(to bottom right, rgb(239, 246, 255), rgb(255, 255, 255), rgb(239, 246, 255))'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MouseParallax strength={15}>
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to{' '}
                  <motion.span 
                    className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent block sm:inline"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: '200% auto' }}
                  >
                    Trimity Consultants
                  </motion.span>
                </motion.h1>
              </MouseParallax>

              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Since 2019, we've been your one-stop destination for comprehensive engineering solutions. 
                At Trimity, we bridge the coordination gap between Information to Practical solution. 
                While plumbing services remain our core expertise, we also deliver unified solutions through 
                our trusted associates in electrical, HVAC, and fire-fighting systems.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/services" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg cursor-pointer overflow-hidden group text-sm sm:text-base"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Explore Services</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "rgb(37, 99, 235)",
                      backgroundColor: "rgba(59, 130, 246, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-600 text-primary-600 rounded-xl font-semibold transition-all cursor-pointer text-center text-sm sm:text-base"
                  >
                    Contact Us
                  </motion.div>
                </Link>
              </motion.div>

              {/* Service Cards Row */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg cursor-pointer group`}
                  >
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 mb-3 mx-auto bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-sm sm:text-base font-bold text-center mb-1">{service.title}</h3>
                    <p className="text-xs text-white/90 text-center line-clamp-2">{service.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Interactive Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden md:flex items-center justify-center"
            >
              {/* Animated Stats Cards */}
              <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Center rotating element */}
                <motion.div
                  className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-primary-400/20 to-primary-600/20 backdrop-blur-sm"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity }
                  }}
                />

                {/* Floating stat cards in orbital pattern */}
                <motion.div
                  className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-primary-100"
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-1">450+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-0 right-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-primary-100"
                  animate={{ 
                    y: [0, 20, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-1">21+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </motion.div>

                <motion.div
                  className="absolute top-20 left-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-primary-100"
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-1">13+</div>
                  <div className="text-sm text-gray-600">Consulting</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-20 left-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-primary-100"
                  animate={{ 
                    y: [0, 15, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Quality</div>
                </motion.div>

                {/* Connecting lines animation */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="100"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="150"
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 4"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-primary-50/30 to-gray-50" />
        
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 bg-gradient-to-r from-gray-900 via-primary-800 to-gray-900 bg-clip-text text-transparent px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore Our Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { 
                href: "/projects", 
                title: "Our Projects", 
                desc: "Explore our diverse portfolio of successful engineering projects",
                gradient: "from-blue-500 to-cyan-500",
                icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              { 
                href: "/services", 
                title: "What We Provide", 
                desc: "Discover our comprehensive MEPF consulting services",
                gradient: "from-primary-500 to-blue-600",
                icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
              },
              { 
                href: "/about", 
                title: "Know More About Us", 
                desc: "Learn about our vision, mission, and leadership",
                gradient: "from-primary-600 to-primary-800",
                icon: <Flame className="w-6 h-6 sm:w-8 sm:h-8" />
              }
            ].map((link, idx) => (
              <Link key={idx} href={link.href}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    y: -20, 
                    scale: 1.03,
                    rotateY: 5,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${link.gradient} text-white mb-4 sm:mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {link.icon}
                  </motion.div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {link.desc}
                  </p>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  </motion.div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="location-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#location-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6 sm:mb-8"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl">
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 px-4">
              <motion.span
                className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% auto' }}
              >
                Trimity Consultants
              </motion.span>
            </h2>

            <MouseParallax strength={10}>
              <motion.div 
                className="inline-block bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-w-2xl mx-4 sm:mx-auto"
                whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 1.02 }}
              >
                <div className="space-y-2 sm:space-y-3 text-base sm:text-lg text-gray-700">
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-semibold"
                  >
                    Yash Anant, 1402-B, Ashram Road
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Opposite old Reserve Bank of India
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Vishalpur, Muslim Society, Navrangpura
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="font-semibold text-primary-600"
                  >
                    Ahmedabad, Gujarat 380009
                  </motion.p>
                </div>

                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Link href="/contact">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold shadow-lg cursor-pointer text-sm sm:text-base"
                    >
                      <span>Get in Touch</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </MouseParallax>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
