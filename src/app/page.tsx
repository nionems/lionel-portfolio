import Link from "next/link";
import Image from "next/image";
import RecentProjects from "@/components/RecentProjects";
import ResumeButton from "@/components/ResumeButton";

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4 md:space-y-6 py-6 md:py-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl md:rounded-3xl blur-2xl md:blur-3xl"></div>
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl">
            {/* Profile Image */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden ring-4 ring-purple-200 dark:ring-purple-800 shadow-lg">
                <Image
                  src="/images/DSC_5830_edited.png"
                  alt="Lionel - Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text mb-3 md:mb-4">
              Hi, I&apos;m Lionel
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
              Welcome to my portfolio! I&apos;m excited to showcase my skills, experience, and achievements through this collection of my best work. Throughout my career, I&apos;ve had the opportunity to work on some fantastic projects that have allowed me to grow and develop my skills further. This portfolio is a reflection of my passion for mobile application development, and I hope that it demonstrates my ability to deliver exceptional work that meets or exceeds the expectations of my clients. Please take some time to browse through my portfolio and get a better understanding of my abilities and the quality of my work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-4 md:mt-6 px-4">
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

      {/* Featured Skills */}
      <section className="space-y-6 md:space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text px-4">Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg card-hover border border-purple-100 dark:border-purple-800">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg md:rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">F</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">Frontend</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Modern web technologies</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              React, Next.js, TypeScript, Tailwind CSS, and more
            </p>
          </div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg card-hover border border-pink-100 dark:border-pink-800">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg md:rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">B</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">Backend</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Server-side development</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Node.js, Python, databases, APIs, and cloud services
            </p>
          </div>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg card-hover border border-blue-100 dark:border-blue-800 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg md:rounded-xl mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">D</span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3">DevOps</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Development workflow</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Git, Docker, CI/CD, cloud platforms, and monitoring
            </p>
          </div>
        </div>
      </section>

      {/* Recent Work Preview */}
      <section className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4">
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
