import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">About Me</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Learn more about my journey, skills, and passion for creating innovative technology solutions.
        </p>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {/* Personal Info */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-purple-100 dark:border-purple-800">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">Who I Am</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              I&apos;m a passionate developer with over 5 years of experience in creating innovative 
              technology solutions. I specialize in full-stack development, with expertise in 
              modern web technologies, cloud platforms, and emerging technologies like AI and blockchain.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              My approach combines technical excellence with creative problem-solving, 
              always focusing on delivering value to users and businesses alike.
            </p>
          </div>

          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-pink-100 dark:border-pink-800">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">My Journey</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">2023 - Present</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Senior Full-Stack Developer at TechCorp</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">2021 - 2023</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Frontend Developer at WebSolutions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">2019 - 2021</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Junior Developer at StartupXYZ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Stats */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100 dark:border-blue-800">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">Skills & Expertise</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">Frontend Development</span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm md:text-base">95%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">Backend Development</span>
                  <span className="text-pink-600 dark:text-pink-400 font-semibold text-sm md:text-base">90%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">DevOps & Cloud</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">AI & Machine Learning</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold text-sm md:text-base">80%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-green-100 dark:border-green-800">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">50+</div>
                <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">5+</div>
                <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">15+</div>
                <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">100%</div>
                <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Work Together?</h2>
          <p className="text-lg md:text-xl mb-4 md:mb-6 opacity-90">
            Let&apos;s discuss your next project and bring your ideas to life.
          </p>
          <Link href="/contact" className="bg-white text-purple-600 font-semibold py-2 px-6 md:py-3 md:px-8 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base inline-block">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}