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
    const loadProjectsAndMedia = async () => {
      try {
        const projectList = await getProjects();
        setProjects(projectList);

        // Load media for each project
        const mediaMap: Record<string, MediaItem[]> = {};
        for (const project of projectList) {
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
          const firstMedia = media[0];

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
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base">{project.description}</p>
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