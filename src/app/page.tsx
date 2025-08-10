import Link from "next/link";
import Image from "next/image";
import RecentProjects from "@/components/RecentProjects";
import ResumeButton from "@/components/ResumeButton";
import ProfileImage from "@/components/ProfileImage";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="text-center space-y-3 md:space-y-4 py-4 md:py-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl md:rounded-3xl blur-2xl md:blur-3xl"></div>
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl">
            {/* Profile Image */}
            <ProfileImage />
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-2 md:mb-3">
              Hi, I&apos;m Lionel
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-4xl md:max-w-5xl mx-auto leading-relaxed px-4">
              I have a diverse professional background in Accounting, Sales, Travel, Catering, and Sailing, but my passion has always been technology. A few years ago, I moved to Australia to study Mobile App Development and have since gained over four years of experience creating innovative technology solutions. I specialize in full-stack development, with expertise in modern web technologies, APIs, cloud platforms, and emerging fields such as AI.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-4xl md:max-w-5xl mx-auto leading-relaxed px-4 mt-3">
              I combine technical excellence with creative problem-solving and strong organizational skills, enabling me to manage multiple priorities with a positive, results-driven attitude. My focus is always on delivering value to users and businesses alike, and I am eager to contribute to a team&apos;s success in an entry-level developer role.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-3 md:mt-4 px-4">
              <Link href="/portfolio" className="button-primary text-center">
                View My Work
              </Link>
              <Link href="/contact" className="button-secondary text-center">
                Get In Touch
              </Link>
              <ResumeButton />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg card-hover border border-purple-100 dark:border-purple-800 text-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg md:rounded-xl mx-auto mb-2 md:mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">📊</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">10+</h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Projects Completed</p>
          </div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg card-hover border border-pink-100 dark:border-pink-800 text-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg md:rounded-xl mx-auto mb-2 md:mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">💻</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">5+</h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Years Experience</p>
          </div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg card-hover border border-blue-100 dark:border-blue-800 text-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg md:rounded-xl mx-auto mb-2 md:mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">🚀</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">15+</h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Technologies</p>
          </div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg card-hover border border-green-100 dark:border-green-800 text-center">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg md:rounded-xl mx-auto mb-2 md:mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">⭐</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">100%</h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="space-y-6 md:space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text px-4 pt-4 md:pt-8">Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg card-hover border border-purple-100 dark:border-purple-800">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg md:rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">F</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">Frontend</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Modern web technologies</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, Redux, Context API, and more
            </p>
          </div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg card-hover border border-pink-100 dark:border-pink-800">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg md:rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">B</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">Backend</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Server-side development</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Node.js, Python, Java, Express.js, Firebase Database, MongoDB, PostgreSQL, REST APIs, GraphQL, and cloud services
            </p>
          </div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg card-hover border border-blue-100 dark:border-blue-800 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg md:rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">D</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">DevOps</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Development workflow</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Git, GitHub, Docker, Kubernetes, CI/CD, AWS, Azure, Google Cloud, Jenkins, monitoring, and deployment
            </p>
          </div>
        </div>
      </section>

      {/* Recent Work Preview */}
      <section className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 pt-4 md:pt-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">Recent Projects</h2>
          <Link href="/portfolio" className="button-secondary text-sm md:text-base py-2 px-4 md:py-3 md:px-6">
            View All Projects
          </Link>
        </div>
        <RecentProjects />
      </section>
    </div>
  );
}
