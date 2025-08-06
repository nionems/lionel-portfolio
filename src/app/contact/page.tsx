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
                  <span className="text-white font-bold text-sm md:text-base">L</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Connect professionally</p>
                </div>
              </a>
              <a href="https://github.com/nionems" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg md:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm md:text-base">G</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-base">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">View my code</p>
                </div>
              </a>
              <a href="https://www.youtube.com/@lionelcoevoet" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg md:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm md:text-base">Y</span>
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