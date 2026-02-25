'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, ArrowUp, Sparkles } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Projects', href: '/projects' },
    ],
    services: [
      { name: 'MEPF Consulting', href: '/services' },
      { name: 'Project Management', href: '/services' },
      { name: 'Design Engineering', href: '/services' },
      { name: 'Quality Assurance', href: '/services' },
    ],
    resources: [
      { name: 'Career', href: '/career' },
      { name: 'Blogs', href: '/blogs' },
      { name: 'Contact', href: '/contact' },
    ],
  }

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/share/14aiejY2HNK/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/trimity_consultants?utm_source=qr&igsh=MW53MWw4bjMwdjBkdw==', label: 'Instagram' },
  ]

  return (
    <>
      {/* Wave Divider */}
      <div className="relative -mb-1 leading-none overflow-hidden bg-white">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 sm:h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z" fill="#111827"/>
        </svg>
      </div>

      <footer className="bg-gray-900 text-white relative overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-0 left-0 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
          animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          {/* Tagline strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-10 text-primary-400/70 text-xs font-semibold tracking-widest uppercase"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
            Engineering Excellence Since 2019
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">
                  Trimity Consultants
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                  Delivering world-class MEPF consulting services across India and Africa. Engineering excellence since 2019.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <a href="tel:+919662474538" className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm group">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                      <Phone className="w-4 h-4 text-primary-400" />
                    </div>
                    <span>+91 96624 74538</span>
                  </a>
                  <a href="mailto:trimitybackoffice@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm group">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary-400" />
                    </div>
                    <span>trimitybackoffice@gmail.com</span>
                  </a>
                  <div className="flex items-start gap-3 text-gray-400 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-primary-400" />
                    </div>
                    <span>1402-B, Yash Anant, Ashram Road, Opp. old Reserve bank of India, Navrangpura, Ahmedabad - 380009</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider with live pulse dot */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <p className="text-gray-500 text-sm text-center md:text-left">
                  © {currentYear} Trimity Consultants. All Rights Reserved.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Social Links */}
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-all group"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}

                {/* Back to top */}
                <motion.button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-500 flex items-center justify-center transition-colors shadow-lg shadow-primary-900/40"
                  aria-label="Back to top"
                >
                  <ArrowUp className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  )
}
