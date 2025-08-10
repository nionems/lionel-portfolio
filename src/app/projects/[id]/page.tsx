'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProjects, Project } from '@/lib/projectService';
import { getMediaByProject, MediaItem } from '@/lib/mediaService';
import VideoModal from '@/components/VideoModal';
import VideoThumbnail from '@/components/VideoThumbnail';

export default function ProjectDetails() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageFit, setImageFit] = useState<'contain' | 'cover'>('contain'); // Default to show full image
  const [videoFit, setVideoFit] = useState<'contain' | 'cover'>('contain'); // Default to show full video
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  useEffect(() => {
    const loadProjectAndMedia = async () => {
      try {
        // Load project details
        const projects = await getProjects();
        const foundProject = projects.find(p => (p.id || p.name) === projectId);
        
        if (!foundProject) {
          // Handle project not found
          return;
        }
        
        setProject(foundProject);
        
        // Load project media
        const projectMedia = await getMediaByProject(projectId);
        
        // Sort media to show featured media first
        const sortedMedia = [...projectMedia].sort((a, b) => {
          if (a.id === foundProject.featuredMediaId) return -1;
          if (b.id === foundProject.featuredMediaId) return 1;
          return 0;
        });
        
        setMedia(sortedMedia);
      } catch (error) {
        console.error('Error loading project details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProjectAndMedia();
    }
  }, [projectId]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (media.length === 0) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(media.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [media.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Project not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
            {project.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Project Links */}
          <div className="flex gap-4 mt-6">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                View Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                View Source Code
              </a>
            )}
          </div>
        </div>

        {/* Media Carousel */}
        {media.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Project Gallery ({media.length} items)
              </h2>
              
              {/* Media Fit Toggle */}
              {media[currentSlide]?.type === 'image' && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Image Fit:</span>
                  <button
                    onClick={() => setImageFit(imageFit === 'contain' ? 'cover' : 'contain')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      imageFit === 'contain'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {imageFit === 'contain' ? 'Show Full' : 'Fill Screen'}
                  </button>
                </div>
              )}
              {media[currentSlide]?.type === 'video' && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Video Fit:</span>
                  <button
                    onClick={() => setVideoFit(videoFit === 'contain' ? 'cover' : 'contain')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      videoFit === 'contain'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {videoFit === 'contain' ? 'Show Full' : 'Fill Screen'}
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              {/* Main Carousel */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
                {media[currentSlide] && (
                  <div className="w-full h-full relative">
                    {media[currentSlide].type === 'image' ? (
                      <div className="w-full h-full relative">
                        <img
                          src={media[currentSlide].url}
                          alt={media[currentSlide].title}
                          className={`w-full h-full object-${imageFit}`}
                        />
                        <button
                          onClick={() => window.open(media[currentSlide].url, '_blank')}
                          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                          title="Open in full screen"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </button>
                      </div>
                                         ) : media[currentSlide].type === 'video' ? (
                       <div className="w-full h-full relative">
                         <video
                           src={media[currentSlide].url}
                           className={`w-full h-full object-${videoFit}`}
                           controls
                           autoPlay
                           muted
                           loop
                         >
                           <source src={media[currentSlide].url} type="video/mp4" />
                           <source src={media[currentSlide].url} type="video/webm" />
                           <source src={media[currentSlide].url} type="video/ogg" />
                         </video>
                         <button
                           onClick={() => setVideoModal({
                             isOpen: true,
                             videoUrl: media[currentSlide].url,
                             title: media[currentSlide].title,
                           })}
                           className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                           title="Open in full screen"
                         >
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                           </svg>
                         </button>
                       </div>
                    ) : null}
                    
                    {/* Media Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">
                        {media[currentSlide].title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {media[currentSlide].description}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Navigation Arrows */}
                {media.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {media.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {media.map((item, index) => (
                    <button
                      key={item.id || index}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentSlide
                          ? 'border-purple-500 scale-110'
                          : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                      }`}
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      ) : item.type === 'video' ? (
                        <VideoThumbnail
                          videoUrl={item.url}
                          alt={item.title}
                          className="w-full h-full"
                          showPlayButton={false}
                        />
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Slide Counter */}
              <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                {currentSlide + 1} of {media.length}
              </div>
            </div>
          </div>
        )}

        {/* Back to Portfolio */}
        <div className="text-center">
          <a
            href="/portfolio"
            className="button-secondary"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, videoUrl: '', title: '' })}
        videoUrl={videoModal.videoUrl}
        title={videoModal.title}
      />
    </div>
  );
} 