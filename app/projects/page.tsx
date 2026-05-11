'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import { Globe, Award, TrendingUp, MapPin, Compass, Image as ImageIcon } from 'lucide-react'
import ProjectCarousel from '@/components/ProjectCarousel'

const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Healthcare & Hospitality']

type Project = {
  title: string
  image: string
  category: string
  description: string
  location: string
  city: string
}

const projects: Project[] = [
  {
    title: "Bungalows",
    image: "/projects/bungalows.webp",
    category: "Residential",
    description: "Luxury residential bungalow complexes with fully integrated MEPF systems, designed for comfort and efficiency.",
    location: "Ahmedabad, India",
    city: "Ahmedabad"
  },
  {
    title: "Mixed Use",
    image: "/projects/mixed-use-1.webp",
    category: "Commercial",
    description: "Integrated mixed-use development seamlessly combining retail, office, and residential spaces with advanced MEP infrastructure.",
    location: "Surat, India",
    city: "Surat"
  },
  {
    title: "Mixed Use Development",
    image: "/projects/mixed-use-2.webp",
    category: "Commercial",
    description: "Large-scale mixed-use development featuring cutting-edge plumbing, fire-fighting, and electrical systems.",
    location: "Vadodara, India",
    city: "Vadodara"
  },
  {
    title: "Hotels and Hospitals",
    image: "/projects/mixed-use-1.webp",
    category: "Healthcare & Hospitality",
    description: "Specialised MEPF solutions engineered for the high-demand environments of healthcare and hospitality sectors.",
    location: "Mumbai, India",
    city: "Mumbai"
  },
  {
    title: "Industrial Projects",
    image: "/projects/industrial-1.webp",
    category: "Industrial",
    description: "Robust, scalable MEP systems precisely designed for complex and heavy industrial environments.",
    location: "Sanand, India",
    city: "Sanand"
  },
  {
    title: "Residential Projects",
    image: "/projects/residential.webp",
    category: "Residential",
    description: "Modern high-rise and mid-rise residential complexes with energy-efficient, future-ready MEPF solutions.",
    location: "Pune, India",
    city: "Pune"
  },
  {
    title: "Commercial Projects",
    image: "/projects/mixed-use-2.webp",
    category: "Commercial",
    description: "Premium commercial office spaces fitted with state-of-the-art building services and smart infrastructure.",
    location: "Bengaluru, India",
    city: "Bengaluru"
  }
]

const galleries = [
  {
    title: 'Bungalows',
    images: Array.from({ length: 15 }, (_, i) => `projects/3d/bungalows/${String(i + 1).padStart(2, '0')}.webp`),
  },
  {
    title: 'Commercial',
    images: Array.from({ length: 8 }, (_, i) => `projects/3d/commercial/${String(i + 1).padStart(2, '0')}.webp`),
  },
  {
    title: 'Hospital',
    images: Array.from({ length: 8 }, (_, i) => `projects/3d/hospital/${String(i + 1).padStart(2, '0')}.webp`),
  },
  {
    title: 'Hotel & Café',
    images: [
      ...Array.from({ length: 5 }, (_, i) => `projects/3d/hotel-cafe/${String(i + 1).padStart(2, '0')}.webp`),
      'projects/3d/hotel-cafe/06.webp',
      'projects/3d/hotel-cafe/07.webp',
    ],
  },
  {
    title: 'Mixed Use',
    images: Array.from({ length: 5 }, (_, i) => `projects/3d/mixed-use/${String(i + 1).padStart(2, '0')}.webp`),
  },
  {
    title: 'Residential',
    images: Array.from({ length: 5 }, (_, i) => `projects/3d/residential/${String(i + 1).padStart(2, '0')}.webp`),
  },
  {
    title: 'Residential & Commercial',
    images: Array.from({ length: 5 }, (_, i) => `projects/3d/residential-commercial/${String(i + 1).padStart(2, '0')}.webp`),
  },
]

const stats = [
  { icon: Award, value: '700+', label: 'Projects Completed' },
  { icon: Globe, value: '2', label: 'Countries' },
  { icon: TrendingUp, value: '18+', label: 'Years Experience' },
]

const cityCoordinates: Record<string, { x: number; y: number }> = {
  Ahmedabad: { x: 65.5, y: 49 },
  Surat: { x: 65.8, y: 51 },
  Vadodara: { x: 66.6, y: 50 },
  Mumbai: { x: 64.7, y: 53.2 },
  Sanand: { x: 65.3, y: 49.3 },
  Pune: { x: 66.2, y: 55 },
  Bengaluru: { x: 68.8, y: 60.8 },
}

export default function Projects() {
  const [explorerSector, setExplorerSector] = useState('All')
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const explorerProjects = explorerSector === 'All' ? projects : projects.filter(p => p.category === explorerSector)
  const cityProjectCounts = explorerProjects.reduce<Record<string, number>>((acc, project) => {
    acc[project.city] = (acc[project.city] ?? 0) + 1
    return acc
  }, {})
  const availableCities = Object.entries(cityProjectCounts)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count || a.city.localeCompare(b.city))
  const selectedCity = activeCity && cityProjectCounts[activeCity] ? activeCity : null
  const explorerResults = selectedCity
    ? explorerProjects.filter(project => project.city === selectedCity)
    : explorerProjects
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <ParticleField />

      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 sm:mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 mb-5 rounded-full text-xs font-bold tracking-widest bg-primary-100 text-primary-700 uppercase"
            >
              Our Portfolio
            </motion.span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
              Our Projects
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Delivering excellence across diverse sectors — residential, industrial, healthcare,
              shopping complexes, mid-rise towers, commercial spaces, and hospitality
            </p>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3 sm:gap-5 max-w-xl mx-auto mb-12"
          >
            {stats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="text-center bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-4 shadow-md border border-gray-100 cursor-default"
              >
                <Icon className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">{value}</div>
                <div className="text-xs text-gray-500 font-medium leading-tight mt-0.5">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Project Explorer Map by City + Sector */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-12 sm:mb-14 grid lg:grid-cols-[1.2fr_0.8fr] gap-5 sm:gap-6"
          >
            <div className="rounded-3xl border border-primary-100 bg-white/90 backdrop-blur-sm shadow-lg p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-primary-600" />
                    Project Explorer
                  </h2>
                  <p className="text-sm text-gray-500">Explore live project distribution by city and sector.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((label) => (
                  <button
                    key={label}
                    onClick={() => {
                      setExplorerSector(label)
                      setActiveCity(null)
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      explorerSector === label
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="relative h-[320px] sm:h-[360px] rounded-2xl border border-primary-100 bg-gradient-to-br from-slate-900 via-sky-950 to-cyan-900 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-cyan-400/15 blur-3xl"
                  animate={{ x: [0, 16, -8, 0], y: [0, -12, 8, 0], scale: [1, 1.08, 0.95, 1] }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl"
                  animate={{ x: [0, -22, 10, 0], y: [0, 10, -14, 0], scale: [1, 0.92, 1.06, 1] }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div
                  className="absolute inset-0 opacity-35"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(103,232,249,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(103,232,249,0.15) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                  }}
                />
                <motion.div
                  className="absolute inset-4 sm:inset-6"
                  animate={{ y: [0, -3, 0], scale: [1, 1.01, 1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/maps/world.svg"
                    alt="World map"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 65vw"
                    className="object-contain drop-shadow-[0_0_24px_rgba(34,211,238,0.38)]"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.20),transparent_68%)]" />

                {availableCities.map(({ city, count }) => {
                  const point = cityCoordinates[city] ?? { x: 50, y: 50 }
                  const isSelected = selectedCity === city
                  return (
                    <button
                      key={city}
                      onClick={() => setActiveCity(city)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    >
                      <motion.span
                        className={`absolute -inset-3 rounded-full ${isSelected ? 'bg-cyan-300/35' : 'bg-cyan-200/18'}`}
                        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0.15, 0.7] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <span className={`relative inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold shadow ${
                        isSelected ? 'bg-cyan-500 text-slate-900' : 'bg-white/95 text-gray-700 border border-cyan-100'
                      }`}>
                        <MapPin className="w-3 h-3" />
                        {city}
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-slate-900/20 text-slate-900' : 'bg-primary-100 text-primary-700'}`}>
                          {count}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white shadow-lg p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">City Breakdown</h3>
                {selectedCity && (
                  <button
                    onClick={() => setActiveCity(null)}
                    className="text-xs font-semibold text-primary-700 hover:text-primary-800"
                  >
                    Clear city
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {availableCities.map(({ city, count }) => (
                  <button
                    key={city}
                    onClick={() => setActiveCity(city)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      selectedCity === city
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-600 hover:border-primary-300'
                    }`}
                  >
                    {city} ({count})
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                {explorerResults.slice(0, 4).map(project => (
                  <div key={project.title} className="flex items-center gap-3 rounded-xl bg-gray-50 p-2.5">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="56px"
                        quality={65}
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{project.title}</p>
                      <p className="text-xs text-gray-500">{project.city} • {project.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3D Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 sm:mt-28"
          >
            {/* Section heading */}
            <div className="text-center mb-10">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full text-xs font-bold tracking-widest bg-primary-100 text-primary-700 uppercase"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                3D Renders Gallery
              </motion.span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent mb-3">
                Project Visualisations
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                High-quality 3D renders from our portfolio — browse each category below.
              </p>
            </div>

            {/* Category carousels */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
              {galleries.map((gallery, idx) => (
                <motion.div
                  key={gallery.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-5 rounded-full bg-gradient-to-b from-primary-500 to-primary-700" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">{gallery.title}</h3>
                    <span className="ml-auto text-xs text-gray-400 font-medium">{gallery.images.length} renders</span>
                  </div>
                  <ProjectCarousel images={gallery.images} title={gallery.title} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16 sm:mt-20"
          >
            <div className="inline-block bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-white max-w-2xl w-full mx-auto relative overflow-hidden">
              <motion.div
                className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">Have a project in mind?</h3>
                <p className="text-primary-100 mb-6 text-sm sm:text-base">Our expert team is ready to bring your vision to life with precision engineering and innovative design.</p>
                <a
                  href="/contact"
                  className="inline-block bg-white text-primary-700 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Get in Touch →
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
