import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Portfolio</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Explore my latest projects and technical work. Each project showcases different skills and technologies.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Project 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg card-hover border border-purple-100 overflow-hidden">
            <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">P1</span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">E-Commerce Platform</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">A modern e-commerce solution with React and Node.js</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">React</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Node.js</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">MongoDB</span>
              </div>
              <Link href="/case-studies" className="button-secondary text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 inline-block">
                View Details
              </Link>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg card-hover border border-pink-100 overflow-hidden">
            <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">P2</span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Task Management App</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Full-stack application with real-time updates</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="bg-pink-100 text-pink-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Next.js</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">TypeScript</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">PostgreSQL</span>
              </div>
              <Link href="/case-studies" className="button-secondary text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 inline-block">
                View Details
              </Link>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg card-hover border border-blue-100 overflow-hidden">
            <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">P3</span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">AI Chat Application</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Intelligent chatbot with machine learning</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Python</span>
                <span className="bg-cyan-100 text-cyan-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">TensorFlow</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">FastAPI</span>
              </div>
              <Link href="/case-studies" className="button-secondary text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 inline-block">
                View Details
              </Link>
            </div>
          </div>

          {/* Project 4 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg card-hover border border-green-100 overflow-hidden">
            <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">P4</span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Mobile App</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Cross-platform mobile application</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="bg-green-100 text-green-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">React Native</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Firebase</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Redux</span>
              </div>
              <Link href="/case-studies" className="button-secondary text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 inline-block">
                View Details
              </Link>
            </div>
          </div>

          {/* Project 5 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg card-hover border border-orange-100 overflow-hidden">
            <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">P5</span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Data Dashboard</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Real-time analytics and visualization</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Vue.js</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">D3.js</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Express</span>
              </div>
              <Link href="/case-studies" className="button-secondary text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 inline-block">
                View Details
              </Link>
            </div>
          </div>

          {/* Project 6 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg card-hover border border-indigo-100 overflow-hidden">
            <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">P6</span>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Blockchain App</h3>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Decentralized application on Ethereum</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Solidity</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Web3.js</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">React</span>
              </div>
              <Link href="/case-studies" className="button-secondary text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 inline-block">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}