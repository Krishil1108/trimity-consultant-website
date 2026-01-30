'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import AnimatedGrid from '@/components/AnimatedGrid'
import MouseParallax from '@/components/MouseParallax'

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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

  const projects = [
    {
      title: "Bungalows",
      image: "https://lh3.googleusercontent.com/sitesv/APaQ0SSZb5lM5enDnxp2jmr7D2X91rQsEiaZZEwRwmYdYThL522CaWDXaVG2ePMRXFYnmy1iS_mIsEKKGEBhCJpZd5wo4b3es3u8sfgrZj7I3cGziEeGgEbRVPxoT9dJuuyQlYZgCgBdGZMnOZL9szDnb1uRjDayTF1x9HJ-HbCUYsNF3QghpVa-63QYUr9rQaAg_SBD1OJ731xfxS7U3TvrTJA32kVJMxE8ydI6=w1280",
      category: "Residential"
    },
    {
      title: "Mixed Use",
      image: "https://lh3.googleusercontent.com/sitesv/APaQ0SRMUxuFWEc5xSvaAY-TdakVG8oUsUo3TxFBCQXU28xGTZOcpOc2u7Eh2RbMKYoNvqs683iAbSxEoCZJaYl51FP97rkWfwd43lfSV8Erfh3fvc1yoTquxGLNDuA0FMYWwKgtWzS5atnGy9aZJ3Fa2agHc_iZgXFG_IfuLycQHk1LvH62BJSz-mC3xUUbsmFBcjHr9vDu1vQI0G1dAez7xKK2gwm5pbQDLBhl8Uo=w1280",
      category: "Commercial"
    },
    {
      title: "Mixed Use Development",
      image: "https://lh3.googleusercontent.com/sitesv/APaQ0SS6zHWdaY4NMynOAf-ZIJuiHb2M2xrgWJgq_7tmeFUGL52OA2OwjG_vNrt_x41F18eR5X9QxGEMAC49USb-7nkGaZT_FDnNuKFvy8G1z888NXH9rLbQOWeB_Zd-OSe35BICRFyKXnKfqfku04SwUyikP8LfNmI9ZqUTHATSTCLRTrcGhdM7K4J9OhTe5kpuj4qOys2RfntFkBq3CSHtyo5sNnEpcGx5omdX=w1280",
      category: "Commercial"
    },
    {
      title: "Hotels and Hospitals",
      image: "https://lh3.googleusercontent.com/sitesv/APaQ0SRnp-869xtqoZSCG9rKyOLC_Nx5DMMfTArfAsfy97wwn5j2AjVil5lyyoWngDfV8QgmT2qIieJuG7kmcPccgju5L2K5wrxQdmXT-7dVsVCqQxNkgcNN9oXKE_m84IIUc3v_nblujb4RJAvpaGszjoAO_jWwMfFga1XilZRSCmdGNbFTLrRlnkeV1r10QIbRJrss4ePZiPo3rGz8JimLkap9CH5BZSQx5GlfYe8=w1280",
      category: "Healthcare & Hospitality"
    },
    {
      title: "Industrial Projects",
      image: "https://lh3.googleusercontent.com/sitesv/APaQ0SRzyPmrPcJRX9_Bn9BosRBRwK1KaxhncFR6WTK62rCh4HFFue5p9Mxro4YyK_HEgQO7RdXg7CRQAJVfcAlnuwiK67LefagWe-oTXKKQIDpJsEFt7CSS1xkSS2qaTQR4xs8q4l7wPpHwFp4w0LiqteNMAIYiIol-W6Sb3dqFI6D5xBdTtolyVl5d4REoULN2pH6J2z_tKhv1F6FjMWXHU4ecgFXegRefuXY0wnE=w1280",
      category: "Industrial"
    },
    {
      title: "Residential Projects",
      image: "https://lh3.googleusercontent.com/sitesv/APaQ0STQ8yg2-8ge0sVGjifiwseOevr_QSWHx6xXM7NhfCYvtYf1PD5oO9PR5EB9WY5mTdPS2LcW78YnbZ_lj60l-Gn7GlV1FlHR72e85Gr1vYYw887rxSUFWjM9hGx_ZbiwQMsd7JHUaON6cDHRuephLHDnvPMXMykXoUBovDA3SPt_p09axkH4hW7nzYBDANav_17km-cS9EG5b0895AA20mXMm0sj-hhWi4pZtNk=w1280",
      category: "Residential"
    },
    {
      title: "Commercial Projects",
      image: "https://lh3.googleusercontent.com/sitesv/APaQ0SRMUxuFWEc5xSvaAY-TdakVG8oUsUo3TxFBCQXU28xGTZOcpOc2u7Eh2RbMKYoNvqs683iAbSxEoCZJaYl51FP97rkWfwd43lfSV8Erfh3fvc1yoTquxGLNDuA0FMYWwKgtWzS5atnGy9aZJ3Fa2agHc_iZgXFG_IfuLycQHk1LvH62BJSz-mC3xUUbsmFBcjHr9vDu1vQI0G1dAez7xKK2gwm5pbQDLBhl8Uo=w1280",
      category: "Commercial"
    }
  ]

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <AnimatedGrid />
      <ParticleField />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/80 to-primary-50/80 z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <MouseParallax strength={12}>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.span
                  className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  style={{ backgroundSize: '200% auto' }}
                >
                  Our Projects
                </motion.span>
              </motion.h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Delivering excellence across diverse sectors including residential, industrial, 
                healthcare, shopping complexes, mid-rise towers, commercial spaces, and hospitality
              </p>
            </MouseParallax>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <MouseParallax key={index} strength={8}>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03,
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredIndex === index ? 1.15 : 1,
                        filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)'
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Overlay gradient */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                      animate={{
                        opacity: hoveredIndex === index ? 0.9 : 0.7
                      }}
                    />

                    {/* Animated border light effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-transparent"
                      animate={{
                        borderColor: hoveredIndex === index ? 'rgba(59, 130, 246, 0.5)' : 'transparent'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <motion.div 
                    className="absolute inset-0 flex flex-col justify-end p-8"
                    style={{ zIndex: 10 }}
                  >
                    <motion.span 
                      className="inline-block px-3 py-1 rounded-full bg-primary-500/90 backdrop-blur-sm text-white text-sm font-semibold mb-3 self-start"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgb(59, 130, 246)' }}
                    >
                      {project.category}
                    </motion.span>
                    <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                    
                    <motion.div
                      className="w-16 h-1 bg-primary-400 rounded-full"
                      animate={{
                        width: hoveredIndex === index ? '100%' : '64px'
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary-400 opacity-0"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </MouseParallax>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
