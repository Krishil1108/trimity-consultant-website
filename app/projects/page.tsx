import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Projects() {
  const projects = [
    {
      title: "Bungalows",
      image: "/projects/bungalows.jpg",
      category: "Residential"
    },
    {
      title: "Mixed Use",
      image: "/projects/mixed-use-1.jpg",
      category: "Commercial"
    },
    {
      title: "Mixed Use Development",
      image: "/projects/mixed-use-2.jpg",
      category: "Commercial"
    },
    {
      title: "Hotels and Hospitals",
      image: "/projects/mixed-use-1.jpg",
      category: "Healthcare & Hospitality"
    },
    {
      title: "Industrial Projects",
      image: "/projects/industrial-1.jpg",
      category: "Industrial"
    },
    {
      title: "Residential Projects",
      image: "/projects/residential.jpg",
      category: "Residential"
    },
    {
      title: "Commercial Projects",
      image: "/projects/mixed-use-2.jpg",
      category: "Commercial"
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent">
              Our Projects
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Delivering excellence across diverse sectors including residential, industrial, 
              healthcare, shopping complexes, mid-rise towers, commercial spaces, and hospitality
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-200 relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-primary-500 text-white text-xs sm:text-sm font-semibold mb-2 self-start">
                    {project.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <div className="w-12 h-1 bg-primary-400 rounded-full group-hover:w-full transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
