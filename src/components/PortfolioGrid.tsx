'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects, Project } from '@/lib/projectService';
import { getMediaByProject, MediaItem } from '@/lib/mediaService';
import VideoModal from '@/components/VideoModal';
import VideoThumbnail from '@/components/VideoThumbnail';

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectMedia, setProjectMedia] = useState<Record<string, MediaItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  // Helper function to truncate text to approximately 5 lines
  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Helper function to check if text needs truncation
  const needsTruncation = (text: string, maxLength: number = 200) => {
    return text.length > maxLength;
  };

  const toggleDescription = (projectId: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  useEffect(() => {
    const loadProjectsAndMedia = async () => {
      try {
        const projectList = await getProjects();
        
        // Sort projects by project date (most recent first)
        const sortedProjects = projectList.sort((a, b) => {
          // Try to get dates from projectDate field (the date you entered)
          let dateA: Date;
          let dateB: Date;
          
          // For project A - use projectDate (the date you entered)
          if (a.projectDate) {
            dateA = new Date(a.projectDate);
          } else if (a.createdAt?.toDate) {
            dateA = a.createdAt.toDate();
          } else if (a.createdAt instanceof Date) {
            dateA = a.createdAt;
          } else if (a.createdAt) {
            dateA = new Date(a.createdAt);
          } else {
            dateA = new Date(0); // Default to epoch if no date
          }
          
          // For project B - use projectDate (the date you entered)
          if (b.projectDate) {
            dateB = new Date(b.projectDate);
          } else if (b.createdAt?.toDate) {
            dateB = b.createdAt.toDate();
          } else if (b.createdAt instanceof Date) {
            dateB = b.createdAt;
          } else if (b.createdAt) {
            dateB = new Date(b.createdAt);
          } else {
            dateB = new Date(0); // Default to epoch if no date
          }
          
          // Sort by most recent project date first
          return dateB.getTime() - dateA.getTime();
        });
        
        setProjects(sortedProjects);

        // Debug: Log project data to see what fields are available
        console.log('Projects loaded:', sortedProjects.map(p => ({
          name: p.name,
          projectDate: p.projectDate,
          createdAt: p.createdAt,
          createdAtType: typeof p.createdAt,
          hasToDate: !!p.createdAt?.toDate
        })));
        console.log('Projects sorted by creation date (most recent first)');

        // Load media for each project
        const mediaMap: Record<string, MediaItem[]> = {};
        for (const project of sortedProjects) {
          const projectId = project.id || project.name;
          const media = await getMediaByProject(projectId);
          mediaMap[projectId] = media;
        }
        setProjectMedia(mediaMap);
      } catch (error) {
        console.error('Error loading projects and media:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjectsAndMedia();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 overflow-hidden animate-pulse">
            <div className="h-32 sm:h-40 md:h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 md:p-6 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {projects.map((project, index) => {
                  const projectId = project.id || project.name;
        const media = projectMedia[projectId] || [];
        
        // Get featured media or first media
        const featuredMedia = media.find(m => m.id === project.featuredMediaId);
        const firstMedia = featuredMedia || media[0];

          const gradientColors = [
            'from-purple-600 to-blue-600',
            'from-pink-500 to-red-500',
            'from-blue-500 to-cyan-500',
            'from-green-500 to-emerald-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
          ];

          const borderColors = [
            'border-purple-100 dark:border-purple-800',
            'border-pink-100 dark:border-pink-800',
            'border-blue-100 dark:border-blue-800',
            'border-green-100 dark:border-green-800',
            'border-orange-100 dark:border-orange-800',
            'border-indigo-100 dark:border-indigo-800',
          ];

          return (
            <div key={projectId} className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg card-hover border ${borderColors[index % borderColors.length]} overflow-hidden`}>
              <div className={`h-32 sm:h-40 md:h-48 bg-gradient-to-br ${gradientColors[index % gradientColors.length]} flex items-center justify-center relative overflow-hidden`}>
                {firstMedia ? (
                  firstMedia.type === 'image' ? (
                    <img
                      src={firstMedia.url}
                      alt={firstMedia.title}
                      className="w-full h-full object-cover"
                    />
                  ) : firstMedia.type === 'video' ? (
                    <VideoThumbnail
                      videoUrl={firstMedia.url}
                      alt={firstMedia.title}
                      className="w-full h-full group cursor-pointer"
                      onClick={() => setVideoModal({
                        isOpen: true,
                        videoUrl: firstMedia.url,
                        title: firstMedia.title,
                      })}
                      showPlayButton={true}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Unsupported media type
                      </span>
                    </div>
                  )
                ) : (
                  <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">P{index + 1}</span>
                )}
              </div>
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">{project.name}</h3>
                  {project.projectDate && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {(() => {
                        try {
                          return new Date(project.projectDate).toLocaleDateString();
                        } catch (error) {
                          console.error('Error formatting project date:', error);
                          return 'Date';
                        }
                      })()}
                    </span>
                  )}
                  {project.createdAt && !project.projectDate && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {(() => {
                        try {
                          return project.createdAt.toDate ? project.createdAt.toDate().toLocaleDateString() : 'Recent';
                        } catch (error) {
                          console.error('Error formatting created date:', error);
                          return 'Recent';
                        }
                      })()}
                    </span>
                  )}
                </div>
                <div className="mb-3 md:mb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    {expandedDescriptions[projectId] 
                      ? project.description 
                      : truncateText(project.description)
                    }
                  </p>
                  {needsTruncation(project.description) && (
                    <button
                      onClick={() => toggleDescription(projectId)}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium mt-1 transition-colors"
                    >
                      {expandedDescriptions[projectId] ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-purple-100 text-purple-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                              <Link href={`/projects/${projectId}`} className="button-secondary text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 inline-block">
                View Details
              </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, videoUrl: '', title: '' })}
        videoUrl={videoModal.videoUrl}
        title={videoModal.title}
      />
    </>
  );
} 