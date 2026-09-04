'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, FileText, Upload, Send, Mail, Phone, User, Package, 
  CheckCircle2, XCircle, X, ShieldCheck, Clock, Globe2, Layers, 
  MapPin, Check, FileUp, Trash2, ArrowRight, HelpCircle, ChevronDown, Sparkles
} from 'lucide-react'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const PROJECT_TYPES = [
  { id: 'hospital', label: 'Hospital / Healthcare', icon: '🏥' },
  { id: 'hotel', label: 'Hotel & Luxury Resort', icon: '🏨' },
  { id: 'commercial', label: 'Commercial IT Park', icon: '🏢' },
  { id: 'retail', label: 'Shopping Mall / Retail', icon: '🏬' },
  { id: 'residential', label: 'High-Rise Residential', icon: '🏙️' },
  { id: 'industrial', label: 'Industrial / Warehouse', icon: '🏭' },
]

const AREA_RANGES = [
  '< 25,000 sq.ft.',
  '25k - 100k sq.ft.',
  '100k - 500k sq.ft.',
  '500k+ sq.ft. (Mega)',
]

const MEPF_SERVICES = [
  { id: 'hvac', label: 'HVAC & Climate Control', color: 'border-sky-500 text-sky-400 bg-sky-950/30' },
  { id: 'electrical', label: 'Electrical & Substation', color: 'border-amber-500 text-amber-400 bg-amber-950/30' },
  { id: 'plumbing', label: 'Plumbing & Drainage (PHE)', color: 'border-cyan-500 text-cyan-400 bg-cyan-950/30' },
  { id: 'fire', label: 'Fire Fighting & Life Safety', color: 'border-red-500 text-red-400 bg-red-950/30' },
  { id: 'bim', label: 'BIM 3D Clash Coordination', color: 'border-purple-500 text-purple-400 bg-purple-950/30' },
  { id: 'green', label: 'IGBC Green Building Audit', color: 'border-emerald-500 text-emerald-400 bg-emerald-950/30' },
]

const VENDOR_CATEGORIES = [
  'HVAC Chillers, AHU & VRV',
  'Electrical Switchgear & DG',
  'Pumps & Water Treatment',
  'Fire Fighting Hardware & Pipes',
  'BMS, Automation & ELV',
  'Specialized MEPF Contracting',
]

const FAQS = [
  {
    q: 'How quickly does Trimity evaluate and respond to an RFP?',
    a: 'Our senior estimation and engineering directors review submitted RFPs within 24 to 48 business hours. You will receive an initial acknowledgment followed by an itemized scope of work breakdown.',
  },
  {
    q: 'What file formats are supported for architectural drawings and BOQs?',
    a: 'We accept architectural and structural drawings in PDF, DWG (AutoCAD), and RVT (Revit BIM). For Bills of Quantities (BOQ), we accept XLSX or PDF files up to 15MB.',
  },
  {
    q: 'How does vendor pre-qualification work for ongoing projects?',
    a: 'Registered vendors are evaluated on manufacturing certifications, testing credentials, track record, and warranty support. Pre-approved vendors are placed on our preferred specification lists for ongoing tenders in India and Africa.',
  },
  {
    q: 'Are client project drawings protected under a Non-Disclosure Agreement (NDA)?',
    a: 'Yes. All client project parameters, architectural CAD files, and commercial budgets are handled under strict confidentiality protocols and proprietary engineering non-disclosure standards.',
  },
]

export default function VendorRFP() {
  const [activeTab, setActiveTab] = useState<'rfp' | 'vendor'>('rfp')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [dialog, setDialog] = useState<{
    show: boolean
    type: 'success' | 'error'
    title: string
    message: string
  }>({
    show: false,
    type: 'success',
    title: '',
    message: '',
  })

  // RFP State
  const [rfpForm, setRfpForm] = useState({
    name: '',
    email: '',
    contactNo: '',
    companyName: '',
    location: '',
    projectType: 'Hospital / Healthcare',
    projectArea: '25k - 100k sq.ft.',
    selectedServices: ['hvac', 'electrical', 'plumbing', 'fire'] as string[],
    requirements: '',
    attachment: null as File | null,
  })

  // Vendor State
  const [vendorForm, setVendorForm] = useState({
    name: '',
    email: '',
    contactNo: '',
    companyName: '',
    category: VENDOR_CATEGORIES[0],
    city: '',
    companyNo: '',
    productDetails: '',
    profileAttachment: null as File | null,
    brochureAttachment: null as File | null,
  })

  const toggleService = (id: string) => {
    setRfpForm(prev => {
      const exists = prev.selectedServices.includes(id)
      return {
        ...prev,
        selectedServices: exists 
          ? prev.selectedServices.filter(s => s !== id) 
          : [...prev.selectedServices, id]
      }
    })
  }

  const handleRfpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append('type', 'rfp')
    formData.append('name', rfpForm.name)
    formData.append('email', rfpForm.email)
    formData.append('contactNo', rfpForm.contactNo)
    formData.append('companyName', rfpForm.companyName)
    formData.append('projectType', rfpForm.projectType)
    formData.append('projectArea', rfpForm.projectArea)
    formData.append('location', rfpForm.location)
    formData.append('services', rfpForm.selectedServices.join(', '))
    formData.append('requirements', rfpForm.requirements)
    if (rfpForm.attachment) formData.append('attachment', rfpForm.attachment)

    try {
      const response = await fetch('/api/vendor-rfp', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Submission failed')

      setDialog({
        show: true,
        type: 'success',
        title: 'Proposal Request Received!',
        message: 'Thank you for choosing Trimity Consultants. Our senior engineering estimation team will review your project parameters and contact you within 24 to 48 hours.',
      })
      
      setRfpForm({
        name: '',
        email: '',
        contactNo: '',
        companyName: '',
        location: '',
        projectType: 'Hospital / Healthcare',
        projectArea: '25k - 100k sq.ft.',
        selectedServices: ['hvac', 'electrical', 'plumbing', 'fire'],
        requirements: '',
        attachment: null,
      })
    } catch {
      setDialog({
        show: true,
        type: 'error',
        title: 'Submission Encountered An Error',
        message: 'Unable to submit your proposal request at this moment. Please call our back-office directly at +91 96624 74538 or email info@trimity.in.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append('type', 'vendor')
    formData.append('name', vendorForm.name)
    formData.append('email', vendorForm.email)
    formData.append('contactNo', vendorForm.contactNo)
    formData.append('companyName', vendorForm.companyName)
    formData.append('category', vendorForm.category)
    formData.append('city', vendorForm.city)
    formData.append('companyNo', vendorForm.companyNo)
    formData.append('productDetails', vendorForm.productDetails)
    if (vendorForm.profileAttachment) formData.append('profile', vendorForm.profileAttachment)
    if (vendorForm.brochureAttachment) formData.append('brochure', vendorForm.brochureAttachment)

    try {
      const response = await fetch('/api/vendor-rfp', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Submission failed')

      setDialog({
        show: true,
        type: 'success',
        title: 'Vendor Registration Submitted!',
        message: 'Your company credentials have been routed to Trimity Procurement. Our technical evaluation team will inspect your catalogs for current project tenders.',
      })
      
      setVendorForm({
        name: '',
        email: '',
        contactNo: '',
        companyName: '',
        category: VENDOR_CATEGORIES[0],
        city: '',
        companyNo: '',
        productDetails: '',
        profileAttachment: null,
        brochureAttachment: null,
      })
    } catch {
      setDialog({
        show: true,
        type: 'error',
        title: 'Registration Error',
        message: 'Unable to submit your vendor registration. Please try again or reach our team directly at info@trimity.in.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden">
      <Navigation />

      {/* Hero Section - Mobile Compact & High Impact */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800">
        {/* Subtle background grid & ambient light */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[350px] bg-gradient-to-r from-blue-600/20 via-sky-500/20 to-teal-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] sm:text-xs font-semibold text-sky-400 tracking-wider uppercase mb-3 sm:mb-4 shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
            Trimity Procurement & Client Gateway
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Architectural Proposals & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Vendor Partnerships
            </span>
          </h1>

          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-2">
            Submit your project blueprints for an itemized MEPF consultancy proposal, or register your manufacturing brand to supply across 700+ landmark developments.
          </p>

          {/* 4 Trust Value Badges - Mobile Optimized Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-10 max-w-4xl mx-auto text-left">
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 mb-1 sm:mb-2" />
              <p className="text-[11px] sm:text-xs font-bold text-white">24-48h SLA</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">Rapid proposal evaluation</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mb-1 sm:mb-2" />
              <p className="text-[11px] sm:text-xs font-bold text-white">Confidential NDA</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">100% drawing protection</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl">
              <Globe2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mb-1 sm:mb-2" />
              <p className="text-[11px] sm:text-xs font-bold text-white">India & Africa</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">Access to 700+ sites</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mb-1 sm:mb-2" />
              <p className="text-[11px] sm:text-xs font-bold text-white">Turnkey MEPF</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">Single-window synergy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pill Slider Mode Switcher - Full-width Thumb Friendly on Mobile */}
      <section className="relative z-10 -mt-5 sm:-mt-6 px-3 sm:px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-slate-900/95 border border-slate-800 p-1 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-between gap-1">
            <button
              onClick={() => setActiveTab('rfp')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-3.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-sm transition-all duration-300 cursor-pointer ${
                activeTab === 'rfp'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Request Proposal <span className="text-[10px] opacity-80">(RFP)</span></span>
            </button>

            <button
              onClick={() => setActiveTab('vendor')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-3.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-sm transition-all duration-300 cursor-pointer ${
                activeTab === 'vendor'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Vendor Partner</span>
            </button>
          </div>
        </div>
      </section>

      {/* Forms Section - Mobile Optimized Padding & Input Sizes */}
      <section className="relative z-10 py-8 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'rfp' ? (
            <motion.div
              key="rfp-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-slate-800 gap-2 sm:gap-4">
                <div>
                  <h2 className="text-xl sm:text-3xl font-black text-white flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center text-sm sm:text-lg flex-shrink-0">
                      📑
                    </span>
                    Request for Proposal (RFP)
                  </h2>
                  <p className="text-[11px] sm:text-sm text-slate-400 mt-1">
                    For Architects, Developers, Builders, and Project Owners seeking MEPF design.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Engineering Directorate Online
                </div>
              </div>

              <form onSubmit={handleRfpSubmit} className="space-y-6 sm:space-y-8">
                {/* 1. Client Details */}
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-orange-400 mb-3 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[9px]">1</span>
                    Client & Organization Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={rfpForm.name}
                        onChange={(e) => setRfpForm({ ...rfpForm, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none placeholder-slate-500"
                        placeholder="e.g. Rajesh Mehta"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Official Email <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={rfpForm.email}
                        onChange={(e) => setRfpForm({ ...rfpForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none placeholder-slate-500"
                        placeholder="rajesh@developergroup.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Contact Number / WhatsApp <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={rfpForm.contactNo}
                        onChange={(e) => setRfpForm({ ...rfpForm, contactNo: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none placeholder-slate-500"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Company / Development Firm
                      </label>
                      <input
                        type="text"
                        value={rfpForm.companyName}
                        onChange={(e) => setRfpForm({ ...rfpForm, companyName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none placeholder-slate-500"
                        placeholder="e.g. Horizon Real Estate"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Project Site Location (City / State)
                      </label>
                      <input
                        type="text"
                        value={rfpForm.location}
                        onChange={(e) => setRfpForm({ ...rfpForm, location: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none placeholder-slate-500"
                        placeholder="e.g. GIFT City, Gandhinagar / Nairobi, Kenya"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Project Classification */}
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-orange-400 mb-2.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[9px]">2</span>
                    Project Sector & Estimated Scale
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    {PROJECT_TYPES.map(t => {
                      const isSelected = rfpForm.projectType === t.label
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setRfpForm({ ...rfpForm, projectType: t.label })}
                          className={`flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] ${
                            isSelected
                              ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-md'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-sm sm:text-base flex-shrink-0">{t.icon}</span>
                          <span className="text-[11px] sm:text-xs truncate">{t.label}</span>
                        </button>
                      )
                    })}
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-slate-400 mb-1.5">Built-Up Area:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                      {AREA_RANGES.map(range => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setRfpForm({ ...rfpForm, projectArea: range })}
                          className={`py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-medium border transition-all cursor-pointer truncate min-h-[40px] ${
                            rfpForm.projectArea === range
                              ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Scope of MEPF Services */}
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-orange-400 mb-2.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[9px]">3</span>
                    Required MEPF Disciplines (Tap to select)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {MEPF_SERVICES.map(service => {
                      const isChecked = rfpForm.selectedServices.includes(service.id)
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] ${
                            isChecked
                              ? `${service.color} border-current font-bold shadow-md`
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-xs">{service.label}</span>
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ${
                            isChecked ? 'bg-current border-current text-slate-950' : 'border-slate-700'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 4. Detailed Scope & Drawings */}
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-orange-400 mb-2.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center text-[9px]">4</span>
                    Detailed Scope & Blueprint Attachment
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Specific Requirements or Milestones <span className="text-orange-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={rfpForm.requirements}
                        onChange={(e) => setRfpForm({ ...rfpForm, requirements: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-4 text-base sm:text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none resize-none placeholder-slate-500"
                        placeholder="Describe floor count, specific cooling loads, substation requirements, or target completion dates..."
                      />
                    </div>

                    {/* Drag-and-drop file upload */}
                    <div className="border-2 border-dashed border-slate-800 hover:border-orange-500/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transition-all bg-slate-950/40 group">
                      {rfpForm.attachment ? (
                        <div className="flex items-center justify-between bg-slate-900 border border-slate-700 p-3 rounded-xl max-w-md mx-auto">
                          <div className="flex items-center gap-2.5 truncate text-left">
                            <FileUp className="w-5 h-5 text-orange-400 flex-shrink-0" />
                            <div className="truncate">
                              <p className="text-xs font-bold text-white truncate">{rfpForm.attachment.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                {(rfpForm.attachment.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setRfpForm({ ...rfpForm, attachment: null })}
                            className="text-slate-400 hover:text-red-400 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-white mb-0.5">
                            Tap to attach Architectural Drawings / BOQ
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                            PDF, DWG, RVT, XLSX (Up to 15MB)
                          </p>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.rvt,.zip"
                            onChange={(e) => setRfpForm({ ...rfpForm, attachment: e.target.files?.[0] || null })}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-orange-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Transmitting Proposal Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Project Proposal Request (RFP)
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="vendor-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-slate-800 gap-2 sm:gap-4">
                <div>
                  <h2 className="text-xl sm:text-3xl font-black text-white flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center text-sm sm:text-lg flex-shrink-0">
                      🏭
                    </span>
                    Vendor & Supplier Registration
                  </h2>
                  <p className="text-[11px] sm:text-sm text-slate-400 mt-1">
                    For Manufacturers, Equipment OEMs, and Specialized MEPF Contractors.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-500/30 px-2.5 py-1 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  Procurement Gateway Active
                </div>
              </div>

              <form onSubmit={handleVendorSubmit} className="space-y-6 sm:space-y-8">
                {/* 1. Company Information */}
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-sky-400 mb-3 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-sky-500/20 flex items-center justify-center text-[9px]">1</span>
                    Company Credentials & Contact Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Company Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vendorForm.companyName}
                        onChange={(e) => setVendorForm({ ...vendorForm, companyName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none placeholder-slate-500"
                        placeholder="e.g. Apex Industrial Systems Ltd."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Authorized Representative <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vendorForm.name}
                        onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none placeholder-slate-500"
                        placeholder="Contact Person Name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Official Business Email <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={vendorForm.email}
                        onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none placeholder-slate-500"
                        placeholder="procurement@apexindustrial.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Contact Number / Mobile <span className="text-sky-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={vendorForm.contactNo}
                        onChange={(e) => setVendorForm({ ...vendorForm, contactNo: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none placeholder-slate-500"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        HQ / Factory Location (City & State)
                      </label>
                      <input
                        type="text"
                        value={vendorForm.city}
                        onChange={(e) => setVendorForm({ ...vendorForm, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none placeholder-slate-500"
                        placeholder="e.g. Ahmedabad, Gujarat"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        GST / CIN Registration No.
                      </label>
                      <input
                        type="text"
                        value={vendorForm.companyNo}
                        onChange={(e) => setVendorForm({ ...vendorForm, companyNo: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-base sm:text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none placeholder-slate-500"
                        placeholder="24AAAAA0000A1Z5"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Primary Supply Category */}
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-sky-400 mb-2.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-sky-500/20 flex items-center justify-center text-[9px]">2</span>
                    Primary Supply Category
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {VENDOR_CATEGORIES.map(cat => {
                      const isSelected = vendorForm.category === cat
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setVendorForm({ ...vendorForm, category: cat })}
                          className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all cursor-pointer min-h-[44px] ${
                            isSelected
                              ? 'bg-sky-500/20 border-sky-500 text-white font-bold shadow-md'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 3. Product Details */}
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-sky-400 mb-2.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-sky-500/20 flex items-center justify-center text-[9px]">3</span>
                    Products & Technical Capabilities
                  </h3>
                  <textarea
                    required
                    rows={3}
                    value={vendorForm.productDetails}
                    onChange={(e) => setVendorForm({ ...vendorForm, productDetails: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-4 text-base sm:text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all outline-none resize-none placeholder-slate-500 mb-3"
                    placeholder="Provide overview of product lines, IS/UL/CE certifications, client references, and warranty standards..."
                  />

                  {/* Dual Uploads - Mobile Friendly */}
                  <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-4">
                    {/* Profile */}
                    <div className="border border-dashed border-slate-800 hover:border-sky-500/60 p-3 sm:p-4 rounded-xl bg-slate-950/50 text-center">
                      <p className="text-xs font-bold text-white mb-1">Company Profile (PDF)</p>
                      {vendorForm.profileAttachment ? (
                        <div className="flex items-center justify-between bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs">
                          <span className="truncate text-slate-200">{vendorForm.profileAttachment.name}</span>
                          <button
                            type="button"
                            onClick={() => setVendorForm({ ...vendorForm, profileAttachment: null })}
                            className="text-slate-400 hover:text-red-400 ml-2 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block mt-1.5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            Tap to Upload Profile
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setVendorForm({ ...vendorForm, profileAttachment: e.target.files?.[0] || null })}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Brochure */}
                    <div className="border border-dashed border-slate-800 hover:border-sky-500/60 p-3 sm:p-4 rounded-xl bg-slate-950/50 text-center">
                      <p className="text-xs font-bold text-white mb-1">Technical Catalog / Brochure</p>
                      {vendorForm.brochureAttachment ? (
                        <div className="flex items-center justify-between bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs">
                          <span className="truncate text-slate-200">{vendorForm.brochureAttachment.name}</span>
                          <button
                            type="button"
                            onClick={() => setVendorForm({ ...vendorForm, brochureAttachment: null })}
                            className="text-slate-400 hover:text-red-400 ml-2 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block mt-1.5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            Tap to Upload Catalog
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setVendorForm({ ...vendorForm, brochureAttachment: e.target.files?.[0] || null })}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Registering Vendor Credentials...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Vendor Partner Registration
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* FAQ & Guidelines Section */}
      <section className="relative z-10 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-400 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            Clear Standards & Process
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div 
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left font-bold text-xs sm:text-base text-white hover:text-sky-400 transition-colors cursor-pointer gap-2"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-2.5 sm:pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Direct Technical Callout */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-slate-700/60 p-5 sm:p-8 rounded-2xl sm:rounded-3xl text-center shadow-xl">
          <h3 className="text-base sm:text-xl font-bold text-white mb-1.5">
            Need Direct Technical Assistance or Fast Evaluation?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-4 sm:mb-5">
            Reach our Head Office engineering team directly for ongoing bids or active project consultations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+919662474538"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4" />
              +91 96624 74538
            </a>
            <a
              href="mailto:info@trimity.in"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-colors border border-slate-700"
            >
              <Mail className="w-4 h-4" />
              info@trimity.in
            </a>
          </div>
        </div>
      </section>

      {/* Custom Success/Error Dialog */}
      <AnimatePresence>
        {dialog.show && (
          <div 
            onClick={() => setDialog({ ...dialog, show: false })}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center"
            >
              <button
                onClick={() => setDialog({ ...dialog, show: false })}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-4 sm:mb-5 flex items-center justify-center shadow-lg border border-white/10">
                {dialog.type === 'success' ? (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                    <XCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {dialog.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 sm:mb-6">
                {dialog.message}
              </p>

              <button
                onClick={() => setDialog({ ...dialog, show: false })}
                className={`w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg cursor-pointer ${
                  dialog.type === 'success'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110'
                    : 'bg-gradient-to-r from-red-500 to-rose-600 hover:brightness-110'
                }`}
              >
                Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
