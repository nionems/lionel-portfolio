'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { uploadMedia, getMediaItems, deleteMediaItem, MediaItem } from '@/lib/mediaService';
import { getProjects, Project } from '@/lib/projectService';
import { ThemeToggle } from '@/components/ThemeToggle';
import ProjectManager from '@/components/ProjectManager';
import VideoModal from '@/components/VideoModal';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null as File | null,
    projectId: '',
    projectName: '',
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'media' | 'projects'>('media');
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
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadMediaItems();
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    try {
      const projectList = await getProjects();
      setProjects(projectList);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadMediaItems = async () => {
    try {
      const items = await getMediaItems();
      setMediaItems(items);
    } catch (error) {
      console.error('Error loading media items:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) return;

    setIsUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      await uploadMedia(formData.file, formData.title, formData.description, formData.projectId, formData.projectName);
      setUploadStatus({
        type: 'success',
        message: 'Media uploaded successfully!',
      });
      setFormData({ title: '', description: '', file: null, projectId: '', projectName: '' });
      loadMediaItems();
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Failed to upload media. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteMediaItem(id);
        loadMediaItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-300">
                Welcome, {user.email}
              </span>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="button-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'media'
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Media Management
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Project Management
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Form */}
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Upload Media
              </h2>

              {uploadStatus.type && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  uploadStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                {uploadStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Project (Optional)
                  </label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => {
                      const selectedProject = projects.find(p => p.id === e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        projectId: e.target.value,
                        projectName: selectedProject?.name || '',
                      }));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">No project assigned</option>
                    {projects.map((project) => (
                      <option key={project.id || project.name} value={project.id || project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    File (Image or Video)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload Media'}
                </button>
              </form>
            </div>

            {/* Media Gallery */}
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Media Gallery ({mediaItems.length})
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {item.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Type: {item.type} • {item.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown date'}
                          {item.projectName && (
                            <span className="ml-2 text-purple-600 dark:text-purple-400">
                              • Project: {item.projectName}
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id!)}
                        className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                    
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="mt-3 w-full h-32 object-cover rounded-lg"
                      />
                    ) : item.type === 'video' ? (
                      <div className="mt-3 relative">
                        <video
                          src={item.url}
                          controls
                          preload="metadata"
                          className="w-full h-32 object-cover rounded-lg"
                          poster={item.url + '?thumb=1'}
                        >
                          <source src={item.url} type="video/mp4" />
                          <source src={item.url} type="video/webm" />
                          <source src={item.url} type="video/ogg" />
                          Your browser does not support the video tag.
                        </video>
                        <button
                          onClick={() => setVideoModal({
                            isOpen: true,
                            videoUrl: item.url,
                            title: item.title,
                          })}
                          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                          title="Open in full screen"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="mt-3 w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          Unsupported media type: {item.type}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                
                {mediaItems.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No media items uploaded yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <ProjectManager />
        )}
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