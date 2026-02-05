'use client'

import { motion } from 'framer-motion'
import { Building2, FileText, Upload, Send, Mail, Phone, User, Package } from 'lucide-react'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'

export default function VendorRFP() {
  const [activeTab, setActiveTab] = useState<'vendor' | 'rfp'>('vendor')
  const [vendorForm, setVendorForm] = useState({
    name: '',
    contactNo: '',
    companyNo: '',
    productDetails: '',
    profileAttachment: null as File | null,
    brochureAttachment: null as File | null
  })
  
  const [rfpForm, setRfpForm] = useState({
    name: '',
    email: '',
    contactNo: '',
    companyName: '',
    requirements: '',
    attachment: null as File | null
  })

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('type', 'vendor')
    formData.append('name', vendorForm.name)
    formData.append('contactNo', vendorForm.contactNo)
    formData.append('companyNo', vendorForm.companyNo)
    formData.append('productDetails', vendorForm.productDetails)
    if (vendorForm.profileAttachment) formData.append('profile', vendorForm.profileAttachment)
    if (vendorForm.brochureAttachment) formData.append('brochure', vendorForm.brochureAttachment)

    // TODO: Send email via API route
    console.log('Vendor registration submitted:', vendorForm)
    alert('Vendor registration submitted successfully! We will contact you soon.')
    
    // Reset form
    setVendorForm({
      name: '',
      contactNo: '',
      companyNo: '',
      productDetails: '',
      profileAttachment: null,
      brochureAttachment: null
    })
  }

  const handleRfpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('type', 'rfp')
    formData.append('name', rfpForm.name)
    formData.append('email', rfpForm.email)
    formData.append('contactNo', rfpForm.contactNo)
    formData.append('companyName', rfpForm.companyName)
    formData.append('requirements', rfpForm.requirements)
    if (rfpForm.attachment) formData.append('attachment', rfpForm.attachment)

    // TODO: Send email via API route
    console.log('RFP submitted:', rfpForm)
    alert('Request for Proposal submitted successfully! We will get back to you soon.')
    
    // Reset form
    setRfpForm({
      name: '',
      email: '',
      contactNo: '',
      companyName: '',
      requirements: '',
      attachment: null
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <ParticleField />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden relative">
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
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-10 h-10 md:w-12 md:h-12" />
              </div>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Vendor Registration & RFP
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Partner with us or submit your project requirements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('vendor')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === 'vendor'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Building2 className="w-5 h-5 inline-block mr-2" />
              Vendor Registration
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('rfp')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === 'rfp'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5 inline-block mr-2" />
              Request for Proposal
            </motion.button>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'vendor' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Vendor Registration</h2>
                  <p className="text-gray-600">Register as our vendor partner</p>
                </div>
              </div>

              <form onSubmit={handleVendorSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline-block mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={vendorForm.name}
                    onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline-block mr-2" />
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={vendorForm.contactNo}
                      onChange={(e) => setVendorForm({ ...vendorForm, contactNo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Building2 className="w-4 h-4 inline-block mr-2" />
                      Company Number
                    </label>
                    <input
                      type="tel"
                      value={vendorForm.companyNo}
                      onChange={(e) => setVendorForm({ ...vendorForm, companyNo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                      placeholder="Company contact number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Package className="w-4 h-4 inline-block mr-2" />
                    Product Details *
                  </label>
                  <textarea
                    required
                    value={vendorForm.productDetails}
                    onChange={(e) => setVendorForm({ ...vendorForm, productDetails: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none resize-none"
                    placeholder="Describe your products and services..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Upload className="w-4 h-4 inline-block mr-2" />
                      Company Profile
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setVendorForm({ ...vendorForm, profileAttachment: e.target.files?.[0] || null })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Upload className="w-4 h-4 inline-block mr-2" />
                      Technical Brochure
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setVendorForm({ ...vendorForm, brochureAttachment: e.target.files?.[0] || null })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Registration
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Request for Proposal</h2>
                  <p className="text-gray-600">Submit your project requirements</p>
                </div>
              </div>

              <form onSubmit={handleRfpSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline-block mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={rfpForm.name}
                    onChange={(e) => setRfpForm({ ...rfpForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline-block mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={rfpForm.email}
                      onChange={(e) => setRfpForm({ ...rfpForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline-block mr-2" />
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={rfpForm.contactNo}
                      onChange={(e) => setRfpForm({ ...rfpForm, contactNo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 inline-block mr-2" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={rfpForm.companyName}
                    onChange={(e) => setRfpForm({ ...rfpForm, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline-block mr-2" />
                    Project Requirements *
                  </label>
                  <textarea
                    required
                    value={rfpForm.requirements}
                    onChange={(e) => setRfpForm({ ...rfpForm, requirements: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none resize-none"
                    placeholder="Describe your project requirements in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Upload className="w-4 h-4 inline-block mr-2" />
                    Attachment (Optional)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={(e) => setRfpForm({ ...rfpForm, attachment: e.target.files?.[0] || null })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit RFP
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
