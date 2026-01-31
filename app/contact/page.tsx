'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Globe, Send } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function Contact() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const contactInfo = [
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Visit Us",
      content: "Yash Anant, 1402-B, Ashram Rd, opposite old Reserve Bank of India, Vishalpur, Muslim Society, Navrangpura, Ahmedabad, Gujarat 380009",
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: <Phone className="w-12 h-12" />,
      title: "Call Us",
      content: "Contact us for project inquiries and consultations",
      color: "from-green-500 to-emerald-500",
      gradient: "from-green-50 to-emerald-50"
    },
    {
      icon: <Mail className="w-12 h-12" />,
      title: "Email Us",
      content: "info@trimity.co.in",
      color: "from-orange-500 to-red-500",
      gradient: "from-orange-50 to-red-50"
    }
  ]

  const workingHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "9:00 AM - 2:00 PM" },
    { day: "Sunday", time: "Closed" }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden relative">
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
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Send className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </div>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 max-w-2xl mx-auto px-4">
              Let's discuss your project requirements and explore how we can help bring your vision to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mx-auto mb-6 relative`}
                    animate={{
                      rotate: hoveredCard === index ? 360 : 0,
                      scale: hoveredCard === index ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-white/20"
                      animate={{
                        scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                        opacity: hoveredCard === index ? [0.5, 0, 0.5] : 0
                      }}
                      transition={{ duration: 1, repeat: hoveredCard === index ? Infinity : 0 }}
                    />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2">
              {/* Map Embed */}
              <div className="h-96 md:h-auto relative group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9876543210123!2d72.5555555!3d23.0333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAyJzAwLjAiTiA3MsKwMzMnMjAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              </div>

              {/* Office Info */}
              <div className="p-12 bg-gradient-to-br from-gray-50 to-white">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Our Office</h2>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary-600" />
                      </div>
                      <div>
                        <p className="text-lg text-gray-700 font-medium">Trimity Consultants</p>
                        <p className="text-gray-600">Yash Anant, 1402-B</p>
                        <p className="text-gray-600">Ashram Road</p>
                        <p className="text-gray-600">Opposite old Reserve Bank of India</p>
                        <p className="text-gray-600">Vishalpur, Muslim Society</p>
                        <p className="text-gray-600">Navrangpura, Ahmedabad</p>
                        <p className="text-gray-600 font-semibold">Gujarat 380009</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <h3 className="text-xl font-bold text-gray-900">Working Hours</h3>
                    </div>
                    <div className="space-y-2">
                      {workingHours.map((schedule, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-center py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          <span className="text-gray-700 font-medium">{schedule.day}</span>
                          <span className="text-gray-600">{schedule.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.a
                    href="https://maps.google.com/?q=Yash+Anant+1402-B+Ashram+Road+Navrangpura+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Get Directions</span>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-3xl p-12 text-center shadow-lg border border-primary-100"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Globe className="w-8 h-8 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're starting a new project or need expert consultation, 
              we're here to help transform your vision into reality.
            </p>
            <a 
              href="mailto:info@trimity.co.in"
              className="text-primary-600 font-semibold text-lg hover:text-primary-700 transition-colors"
            >
              info@trimity.co.in
            </a>
            <p className="text-gray-600 mt-4">
              www.trimity.co.in
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
