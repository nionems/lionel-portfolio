import Link from "next/link";
import { getCaseStudies } from "@/lib/caseStudyService";
import { getMediaItems } from "@/lib/mediaService";
import VideoThumbnail from "@/components/VideoThumbnail";

export default async function CaseStudiesPage() {
  // Fetch case studies and media items
  const caseStudies = await getCaseStudies();
  const mediaItems = await getMediaItems();
  
  // Create a map of media items by ID for quick lookup
  const mediaMap = new Map(mediaItems.map(item => [item.id, item]));

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
        {caseStudies.map((caseStudy, index) => {
          const featuredMedia = caseStudy.featuredMediaId ? mediaMap.get(caseStudy.featuredMediaId) : null;
          const gradientColors = [
            'from-purple-600 to-blue-600',
            'from-pink-500 to-red-500',
            'from-blue-500 to-cyan-500',
            'from-green-500 to-teal-500',
            'from-orange-500 to-yellow-500',
            'from-indigo-500 to-purple-500'
          ];
          const gradientColor = gradientColors[index % gradientColors.length];
          const borderColor = gradientColor.includes('purple') ? 'border-purple-100' :
                             gradientColor.includes('pink') ? 'border-pink-100' :
                             gradientColor.includes('blue') ? 'border-blue-100' :
                             gradientColor.includes('green') ? 'border-green-100' :
                             gradientColor.includes('orange') ? 'border-orange-100' :
                             'border-indigo-100';

          return (
            <div key={caseStudy.id} className={`bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border ${borderColor} overflow-hidden`}>
              <div className={`h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
                {featuredMedia ? (
                  featuredMedia.type === 'image' ? (
                    <img
                      src={featuredMedia.url}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <VideoThumbnail
                      videoUrl={featuredMedia.url}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                      showPlayButton={false}
                    />
                  )
                ) : (
                  <span className="text-white text-4xl sm:text-5xl md:text-6xl font-bold">
                    {caseStudy.subtitle}
                  </span>
                )}
              </div>
              
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                  {caseStudy.title}
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                  <span className="font-medium">Role:</span> {caseStudy.role}<br/>
                  {caseStudy.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="bg-purple-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                    <h3 className="font-semibold text-purple-800 mb-2 text-sm md:text-base">Challenge</h3>
                    <p className="text-xs md:text-sm text-gray-600">{caseStudy.challenge}</p>
                  </div>
                  <div className="bg-blue-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                    <h3 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">Solution</h3>
                    <p className="text-xs md:text-sm text-gray-600">{caseStudy.solution}</p>
                  </div>
                  <div className="bg-green-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                    <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">Result</h3>
                    <p className="text-xs md:text-sm text-gray-600">{caseStudy.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {caseStudy.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="bg-gray-100 text-gray-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Project Date: {new Date(caseStudy.projectDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <Link href="/portfolio" className="button-primary inline-block">
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        
        {caseStudies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Case Studies Yet</h3>
            <p className="text-gray-600">Case studies will appear here once they&apos;re added through the admin dashboard.</p>
          </div>
        )}
      </section>
    </div>
  );
}







