'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Building2, ArrowRight, Zap, Droplets, Wind, Flame, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import AnimatedGrid from '@/components/AnimatedGrid'
import MouseParallax from '@/components/MouseParallax'

// Animated count-up component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = Math.max(1, Math.ceil(target / 60))
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else { setCount(start) }
        }, 25)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])
  return <div ref={ref}>{count}{suffix}</div>
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const cyclingServices = ['MEPF Design', 'Plumbing Systems', 'Fire Safety', 'HVAC Solutions', 'Electrical Design']
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setActiveService(i => (i + 1) % cyclingServices.length), 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed text-left sm:text-justify mb-3">
                  Since 2019, we've been your one-stop destination for comprehensive engineering solutions. 
                  At Trimity, we bridge the coordination gap between Information to Practical solution.
                </p>
                <div className="flex items-center gap-3 text-base sm:text-lg font-semibold text-gray-700">
                  <span>Experts in</span>
                  <span className="relative inline-block overflow-hidden h-8">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeService}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="absolute whitespace-nowrap px-3 py-0.5 rounded-full bg-gradient-to-r from-primary-500 to-blue-600 text-white text-sm sm:text-base shadow-md"
                      >
                        {cyclingServices[activeService]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
              </motion.div>

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
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-1"><AnimatedCounter target={700} suffix="+" /></div>
                  <div className="text-sm text-gray-600">Projects</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-0 right-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-primary-100"
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-1"><AnimatedCounter target={18} suffix="+" /></div>
                  <div className="text-sm text-gray-600">Years</div>
                </motion.div>

                <motion.div
                  className="absolute top-20 left-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-primary-100"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-1"><AnimatedCounter target={50} suffix="+" /></div>
                  <div className="text-sm text-gray-600">Satisfied Clients</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-20 left-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-primary-100"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="text-4xl font-bold text-primary-600 mb-1"><AnimatedCounter target={100} suffix="%" /></div>
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

      {/* Global Reach Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Global Engineering Excellence
            </h2>
            <p className="text-base sm:text-lg text-primary-100 max-w-3xl mx-auto">
              Delivering world-class MEPF solutions across continents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Globe Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center lg:justify-start"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Animated rotating rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-white/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-4 border-white/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full border-4 border-white/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Center globe icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full blur-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <svg 
                      className="w-32 h-32 sm:w-40 sm:h-40 text-white relative z-10" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                </motion.div>

                {/* Floating location badges */}
                <motion.div
                  className="absolute top-8 right-0 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                >
                  🇮🇳 India
                </motion.div>
                <motion.div
                  className="absolute bottom-8 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                >
                  ZA Africa
                </motion.div>
              </div>
            </motion.div>

            {/* Project Locations */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              {[
                {
                  country: "India",
                  icon: "🇮🇳",
                  color: "from-orange-400 to-orange-600",
                  projects: "650+",
                  description: "Leading MEPF projects across residential, commercial, and industrial sectors"
                },
                {
                  country: "Africa",
                  icon: "ZA",
                  color: "from-blue-400 to-blue-600",
                  projects: "15+",
                  description: "Expanding engineering solutions across African infrastructure"
                }
              ].map((location, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${location.color} flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {location.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white">{location.country}</h3>
                        <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${location.color} text-white text-sm font-semibold shadow-lg`}>
                          {location.projects}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-primary-100 leading-relaxed">
                        {location.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.icon}
                  </motion.div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-left sm:text-justify">
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

          {/* Project Showcase Scrolling Strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
              Our Recent Projects
            </h3>
            
            <div className="relative overflow-hidden">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
              
              {/* Scrolling container */}
              <motion.div
                className="flex gap-4 sm:gap-6"
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {/* Duplicate the array for seamless loop */}
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex gap-4 sm:gap-6">
                    {[
                      { name: "Luxury Residential Complex", type: "Residential", color: "from-blue-500 to-blue-600" },
                      { name: "Modern Shopping Mall", type: "Commercial", color: "from-purple-500 to-purple-600" },
                      { name: "Corporate Office Tower", type: "Commercial", color: "from-green-500 to-green-600" },
                      { name: "Healthcare Facility", type: "Healthcare", color: "from-red-500 to-red-600" },
                      { name: "Industrial Warehouse", type: "Industrial", color: "from-orange-500 to-orange-600" },
                      { name: "Hospitality Resort", type: "Hospitality", color: "from-pink-500 to-pink-600" },
                      { name: "Mixed-Use Development", type: "Mixed-Use", color: "from-indigo-500 to-indigo-600" },
                      { name: "Premium Villa Project", type: "Residential", color: "from-cyan-500 to-cyan-600" },
                    ].map((project, idx) => (
                      <motion.div
                        key={`${setIndex}-${idx}`}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xl group cursor-pointer relative"
                      >
                        {/* Placeholder gradient background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
                          <div className="absolute inset-0 bg-black/20" />
                          {/* Pattern overlay */}
                          <div 
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)',
                            }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="transform group-hover:translate-y-0 transition-transform"
                          >
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white mb-2">
                              {project.type}
                            </span>
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                              {project.name}
                            </h4>
                            <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                              MEPF Design & Consultation
                            </p>
                          </motion.div>
                        </div>

                        {/* Building icon watermark */}
                        <Building2 className="absolute top-4 right-4 w-12 h-12 text-white/10" />
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* View all projects button */}
            <div className="text-center mt-8">
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  View All Projects
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
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
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
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
                    Navrangpura
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

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(59,130,246,0.4)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 text-white shadow-xl flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}
