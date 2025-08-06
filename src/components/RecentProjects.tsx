'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects, Project } from '@/lib/projectService';
import { getMediaByProject, MediaItem } from '@/lib/mediaService';
import VideoModal from '@/components/VideoModal';
import VideoThumbnail from '@/components/VideoThumbnail';

export default function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectMedia, setProjectMedia] = useState<Record<string, MediaItem[]>>({});
  const [loading, setLoading] = useState(true);
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
    const loadRecentProjects = async () => {
      try {
        const projectList = await getProjects();
        // Sort by creation date and take the 2 most recent
        const sortedProjects = projectList
          .sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(0);
            const dateB = b.createdAt?.toDate?.() || new Date(0);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 2);

        setProjects(sortedProjects);

        // Load media for each project
        const mediaMap: Record<string, MediaItem[]> = {};
        for (const project of sortedProjects) {
          const projectId = project.id || project.name;
          const media = await getMediaByProject(projectId);
          mediaMap[projectId] = media;
        }
        setProjectMedia(mediaMap);
      } catch (error) {
        console.error('Error loading recent projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg card-hover border border-purple-100 dark:border-purple-800 animate-pulse">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 dark:bg-gray-700 rounded-xl md:rounded-2xl mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No projects available yet.</p>
      </div>
    );
  }

  const gradientColors = [
    'from-purple-600 to-blue-600',
    'from-pink-500 to-red-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
  ];

  const borderColors = [
    'border-purple-100 dark:border-purple-800',
    'border-pink-100 dark:border-pink-800',
    'border-blue-100 dark:border-blue-800',
    'border-green-100 dark:border-green-800',
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {projects.map((project, index) => {
          const projectId = project.id || project.name;
          const media = projectMedia[projectId] || [];
          
          // Get featured media or first media
          const featuredMedia = media.find(m => m.id === project.featuredMediaId);
          const firstMedia = featuredMedia || media[0];

          return (
            <div key={projectId} className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg card-hover border ${borderColors[index % borderColors.length]}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${gradientColors[index % gradientColors.length]} rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  {firstMedia ? (
                    firstMedia.type === 'image' ? (
                      <img
                        src={firstMedia.url}
                        alt={firstMedia.title}
                        className="w-full h-full object-cover rounded-xl md:rounded-2xl"
                      />
                    ) : firstMedia.type === 'video' ? (
                      <VideoThumbnail
                        videoUrl={firstMedia.url}
                        alt={firstMedia.title}
                        className="w-full h-full rounded-xl md:rounded-2xl cursor-pointer"
                        onClick={() => setVideoModal({
                          isOpen: true,
                          videoUrl: firstMedia.url,
                          title: firstMedia.title,
                        })}
                        showPlayButton={true}
                      />
                    ) : (
                      <span className="text-white font-bold text-lg md:text-2xl">P{index + 1}</span>
                    )
                  ) : (
                    <span className="text-white font-bold text-lg md:text-2xl">P{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 md:mb-3 truncate">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="bg-purple-100 text-purple-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link href={`/projects/${projectId}`} className="button-secondary text-xs md:text-sm py-2 px-3 md:py-2 md:px-4 inline-block">
                    View Details
                  </Link>
                </div>
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