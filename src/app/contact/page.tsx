import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Get In Touch</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          Ready to start your next project? Let&apos;s discuss how I can help bring your ideas to life.
        </p>
      </section>

      {/* Contact Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {/* Contact Form */}
        <ContactForm />

        {/* Contact Info */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-pink-100 dark:border-pink-800">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg md:text-xl">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">nionems@icloud.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg md:text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Sydney, Australia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100 dark:border-blue-800">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6">Connect With Me</h2>
            <div className="space-y-3 md:space-y-4">
              <a href="https://www.linkedin.com/in/lionelcoevoet" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg md:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Connect professionally</p>
                </div>
              </a>
              <a href="https://github.com/nionems" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg md:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">View my code</p>
                </div>
              </a>
              <a href="https://www.youtube.com/@lionelcoevoet" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg md:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">YouTube</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Watch my content</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl md:rounded-2xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Let&apos;s Work Together</h2>
            <p className="mb-4 md:mb-6 opacity-90 text-sm md:text-base">
              I&apos;m always excited to hear about new projects and opportunities. 
              Whether you have a specific project in mind or just want to chat about technology, 
              I&apos;d love to hear from you!
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Web Development</span>
              <span className="bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Mobile Apps</span>
              <span className="bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Cloud Development</span>
              <span className="bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">Full Stack</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}