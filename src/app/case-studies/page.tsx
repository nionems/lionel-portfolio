import Link from "next/link";

export default function CaseStudiesPage() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Case Studies</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Deep dive into my most impactful projects. Learn about the challenges, solutions, and outcomes.
        </p>
      </section>

      {/* Case Studies */}
      <section className="space-y-8 md:space-y-12">
        {/* Case Study 1 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
          <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <span className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">CS1</span>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">E-Commerce Platform Redesign</h2>
            <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
              A comprehensive redesign of an existing e-commerce platform to improve user experience, 
              increase conversion rates, and modernize the technology stack.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-purple-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-purple-800 mb-2 text-sm md:text-base">Challenge</h3>
                <p className="text-xs md:text-sm text-gray-600">Outdated UI, poor mobile experience, slow performance</p>
              </div>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">Solution</h3>
                <p className="text-xs md:text-sm text-gray-600">Modern React frontend, optimized backend, responsive design</p>
              </div>
              <div className="bg-green-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">Result</h3>
                <p className="text-xs md:text-sm text-gray-600">40% increase in conversion, 60% faster load times</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">React</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">Node.js</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">MongoDB</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">AWS</span>
            </div>

            <Link href="/portfolio" className="button-primary inline-block">
              View Project
            </Link>
          </div>
        </div>

        {/* Case Study 2 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
          <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
            <span className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">CS2</span>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">AI-Powered Task Management</h2>
            <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
              Built an intelligent task management system that uses AI to prioritize tasks, 
              suggest optimal workflows, and automate routine processes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-pink-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-pink-800 mb-2 text-sm md:text-base">Challenge</h3>
                <p className="text-xs md:text-sm text-gray-600">Manual task prioritization, inefficient workflows</p>
              </div>
              <div className="bg-red-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-red-800 mb-2 text-sm md:text-base">Solution</h3>
                <p className="text-xs md:text-sm text-gray-600">ML-powered prioritization, automated workflows</p>
              </div>
              <div className="bg-green-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">Result</h3>
                <p className="text-xs md:text-sm text-gray-600">50% time savings, 30% productivity increase</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              <span className="bg-pink-100 text-pink-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">Next.js</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">TypeScript</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">TensorFlow</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">PostgreSQL</span>
            </div>

            <Link href="/portfolio" className="button-primary inline-block">
              View Project
            </Link>
          </div>
        </div>

        {/* Case Study 3 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">CS3</span>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Real-Time Analytics Dashboard</h2>
            <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
              Developed a comprehensive analytics platform that processes millions of data points 
              in real-time and provides actionable insights through interactive visualizations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">Challenge</h3>
                <p className="text-xs md:text-sm text-gray-600">Large data volumes, real-time processing needs</p>
              </div>
              <div className="bg-cyan-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-cyan-800 mb-2 text-sm md:text-base">Solution</h3>
                <p className="text-xs md:text-sm text-gray-600">Stream processing, optimized queries, caching</p>
              </div>
              <div className="bg-green-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">Result</h3>
                <p className="text-xs md:text-sm text-gray-600">Sub-second query times, 99.9% uptime</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">Vue.js</span>
              <span className="bg-cyan-100 text-cyan-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">D3.js</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">Kafka</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">Redis</span>
            </div>

            <Link href="/portfolio" className="button-primary inline-block">
              View Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}