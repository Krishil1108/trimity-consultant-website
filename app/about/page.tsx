'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Building2, Target, Rocket, Award, CheckCircle } from 'lucide-react'
import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import MouseParallax from '@/components/MouseParallax'

export default function About() {
  const containerRef = useRef<HTMLElement>(null!)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <main ref={containerRef} className="min-h-screen bg-white overflow-hidden relative">
      <Navigation />
      
      {/* Background Elements */}
      <ParticleField />

      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
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
                    className="text-lg text-left sm:text-justify"
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
                    <p className="text-base sm:text-lg text-left sm:text-justify">
                      Since our inception, we have successfully undertaken projects of varying sizes and complexities, providing tailored consulting solutions that meet diverse client needs. With a bold yet adaptable approach to industry trends, we continually integrate the latest technologies and methodologies into our workflow.
                    </p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-base sm:text-lg text-left sm:text-justify"
                  >
                    Our commitment to excellence ensures meticulous attention to every project, regardless of scale, striking the perfect balance between cost-effectiveness and system efficiency. This dedication has earned us the trust and loyalty of our clients, who remain our strongest advocates and a driving force behind new opportunities.
                  </motion.p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                    {[
                      "Hospitality Projects",
                      "Healthcare Centers",
                      "Industrial Facilities",
                      "Mixed-Use Developments",
                      "Commercial Spaces",
                      "Residential Complexes",
                      "Residential Villa/ Bungalow",
                      "Shopping Complexes & Various"
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
                    className="text-lg font-semibold text-gray-900 border-t-2 border-primary-200 pt-6 text-left sm:text-justify"
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

                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-left sm:text-justify">
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
                        <span className="font-semibold text-gray-900">Founder of Trimity Consultants</span> and an IGBC-Accredited Professional, is a Civil Engineer with 17+ years of experience in utility consultancy.
                      </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50">
                        <div className="text-3xl font-bold text-primary-600">450+</div>
                        <div className="text-sm text-gray-600 font-semibold">Projects Led</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50">
                        <div className="text-3xl font-bold text-primary-600">17+</div>
                        <div className="text-sm text-gray-600 font-semibold">Years Experience</div>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-1 h-5 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full mr-3"></span>
                        Leadership Excellence
                      </h4>
                      {[
                        "Led 450+ projects with focus on quality & communication",
                        "Civil Engineer specializing in utility consultancy",
                        "Member of Indian Plumbing Association",
                        "Member of Fire & Safety Association of India",
                        "Committed to timely delivery & client satisfaction",
                        "IGBC-Accredited Professional for sustainable practices"
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

      {/* Team Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-primary-50">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto' }}>
                The Faces Behind the Function
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl sm:text-2xl text-gray-600 font-semibold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Core Team, Core Values
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary-500 to-blue-600 mx-auto mt-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>

          {/* Core Team Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-900">
              Our Core Team
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  name: "Mrs. Binjal Lathia",
                  role: "Accounts & Compliance",
                  color: "from-pink-500 to-rose-500",
                  bgColor: "from-pink-50 to-rose-50"
                },
                {
                  name: "Mr. Piyush Diwan",
                  role: "Project Manager",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-50 to-cyan-50"
                },
                {
                  name: "Mr. Vraj Patel",
                  role: "Project Co-ordinator",
                  color: "from-purple-500 to-indigo-500",
                  bgColor: "from-purple-50 to-indigo-50"
                },
                {
                  name: "Mr. Darshit Darji",
                  role: "Junior Engineer",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-50 to-emerald-50"
                },
                {
                  name: "Ms. Kinjal Solanki",
                  role: "Admin & Operation",
                  color: "from-orange-500 to-amber-500",
                  bgColor: "from-orange-50 to-amber-50"
                }
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group"
                >
                  <div className={`relative bg-gradient-to-br ${member.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full`}>
                    {/* Decorative circle */}
                    <motion.div
                      className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${member.color} opacity-10 rounded-full blur-2xl`}
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />

                    <div className="relative z-10 text-center">
                      {/* Avatar Placeholder */}
                      <motion.div
                        className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </motion.div>

                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h4>
                      
                      <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${member.color} text-white text-sm font-semibold shadow-md`}>
                        {member.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* +5 Others Card */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden h-full flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      +5
                    </motion.div>
                    <p className="text-xl font-semibold text-gray-700">
                      Other Team Members
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Supporting our mission
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Team Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
              <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900">
                What Drives Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: "🤝", title: "Collaboration", desc: "Working together for excellence" },
                  { icon: "💡", title: "Innovation", desc: "Always pushing boundaries" },
                  { icon: "🎯", title: "Dedication", desc: "Committed to quality delivery" }
                ].map((value, idx) => (
                  <motion.div
                    key={idx}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-primary-50 hover:to-blue-50 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-4xl mb-3">{value.icon}</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
