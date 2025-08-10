'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { uploadMedia, getMediaItems, deleteMediaItem, updateMediaProject, MediaItem } from '@/lib/mediaService';
import { getProjects, Project } from '@/lib/projectService';
import { ThemeToggle } from '@/components/ThemeToggle';
import ProjectManager from '@/components/ProjectManager';
import VideoModal from '@/components/VideoModal';
import VideoThumbnail from '@/components/VideoThumbnail';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaByProject, setMediaByProject] = useState<Record<string, MediaItem[]>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    files: [] as File[],
    projectId: '',
    projectName: '',
    selectedMediaIds: [] as string[],
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'media' | 'projects' | 'resume'>('media');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [currentResume, setCurrentResume] = useState<string | null>(null);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeStatus, setResumeStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
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
      loadCurrentResume();
    }
  }, [user]);

  const loadCurrentResume = async () => {
    try {
      // Check if there's a resume in Firebase Storage
      const resumeRef = ref(storage, 'resume/resume.pdf');
      const url = await getDownloadURL(resumeRef);
      setCurrentResume(url);
    } catch (error) {
      // Resume doesn't exist yet
      setCurrentResume(null);
    }
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      setResumeStatus({
        type: 'error',
        message: 'Please select a valid PDF file.',
      });
    }
  };

  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resumeFile) {
      setResumeStatus({
        type: 'error',
        message: 'Please select a resume file.',
      });
      return;
    }

    setIsUploadingResume(true);
    setResumeStatus({ type: null, message: '' });

    try {
      // Upload resume to Firebase Storage
      const resumeRef = ref(storage, 'resume/resume.pdf');
      await uploadBytes(resumeRef, resumeFile);
      
      // Get the download URL
      const url = await getDownloadURL(resumeRef);
      setCurrentResume(url);
      
      setResumeStatus({
        type: 'success',
        message: 'Resume uploaded successfully!',
      });
      
      setResumeFile(null);
      // Reset the file input
      const fileInput = document.getElementById('resume-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error uploading resume:', error);
      setResumeStatus({
        type: 'error',
        message: 'Failed to upload resume. Please try again.',
      });
    } finally {
      setIsUploadingResume(false);
    }
  };

  const loadProjects = async () => {
    try {
      const projectList = await getProjects();
      setProjects(projectList);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const refreshProjectList = async () => {
    await loadProjects();
  };

  const loadMediaItems = async () => {
    try {
      const items = await getMediaItems();
      setMediaItems(items);
      
      // Group media by project
      const grouped: Record<string, MediaItem[]> = {};
      
      // Add unassigned media
      const unassigned = items.filter(item => !item.projectId);
      if (unassigned.length > 0) {
        grouped['Unassigned'] = unassigned;
      }
      
      // Group by project
      for (const item of items) {
        if (item.projectId && item.projectName) {
          if (!grouped[item.projectName]) {
            grouped[item.projectName] = [];
          }
          grouped[item.projectName].push(item);
        }
      }
      
      setMediaByProject(grouped);
    } catch (error) {
      console.error('Error loading media items:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if we have either files or selected existing media
    if (formData.files.length === 0 && formData.selectedMediaIds.length === 0) {
      setUploadStatus({
        type: 'error',
        message: 'Please select files or choose existing media.',
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      if (formData.files.length > 0) {
        // Upload multiple new files
        const uploadPromises = formData.files.map(file => 
          uploadMedia(file, formData.title, formData.description, formData.projectId, formData.projectName)
        );
        await Promise.all(uploadPromises);
        setUploadStatus({
          type: 'success',
          message: `${formData.files.length} media files uploaded successfully!`,
        });
      } else if (formData.selectedMediaIds.length > 0) {
        // Assign multiple existing media to project
        for (const mediaId of formData.selectedMediaIds) {
          await updateMediaProject(mediaId, formData.projectId, formData.projectName);
        }
        setUploadStatus({
          type: 'success',
          message: `${formData.selectedMediaIds.length} media items assigned to project successfully!`,
        });
      }
      
      setFormData({ title: '', description: '', files: [], projectId: '', projectName: '', selectedMediaIds: [] });
      loadMediaItems();
      refreshProjectList(); // Refresh project list after media assignment
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Failed to process media. Please try again.',
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
            onClick={() => {
              setActiveTab('media');
              refreshProjectList(); // Refresh projects when switching to media tab
            }}
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
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'resume'
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Resume Management
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Form */}
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Upload Media
                </h2>
                <button
                  onClick={refreshProjectList}
                  className="button-secondary text-xs py-1 px-2"
                  title="Refresh project list"
                >
                  🔄 Refresh Projects
                </button>
              </div>

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
                    Files (Images or Videos) - Multiple Selection
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    multiple
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {formData.files.length > 0 && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Selected: {formData.files.length} file(s)
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                        {formData.files.map(file => file.name).join(', ')}
                      </div>
                    </div>
                  )}
                </div>

                {/* Or Select Existing Media */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Or Select Existing Media
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mediaItems.map((item) => (
                      <label key={item.id} className="flex items-center space-x-3 p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.selectedMediaIds.includes(item.id!)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                selectedMediaIds: [...prev.selectedMediaIds, item.id!],
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                selectedMediaIds: prev.selectedMediaIds.filter(id => id !== item.id),
                              }));
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {item.type} - {item.projectName || 'No project'}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  {/* Selected Items Summary */}
                  {formData.selectedMediaIds.length > 0 && (
                    <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-sm font-medium text-purple-800 dark:text-purple-200">
                        Selected: {formData.selectedMediaIds.length} item(s)
                      </div>
                      <div className="text-xs text-purple-600 dark:text-purple-300 mt-1">
                        {mediaItems
                          .filter(item => formData.selectedMediaIds.includes(item.id!))
                          .map(item => item.title)
                          .join(', ')}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Processing...' : 'Upload/Assign Media'}
                </button>
              </form>
            </div>

            {/* Media Gallery */}
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Media Gallery ({mediaItems.length})
              </h2>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                {Object.entries(mediaByProject).map(([projectName, items]) => (
                  <div key={projectName} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-2 py-1 rounded text-sm mr-2">
                        {projectName}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({items.length} items)
                      </span>
                    </h3>
                    
                    <div className="space-y-3">
                      {items.map((item) => (
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
                              
                              {/* Reassign Project */}
                              <div className="mt-2">
                                <select
                                  value={item.projectId || ''}
                                  onChange={async (e) => {
                                    try {
                                      const newProjectId = e.target.value;
                                      const selectedProject = projects.find(p => p.id === newProjectId);
                                      
                                      // Update the media item in Firestore
                                      await updateMediaProject(item.id!, newProjectId, selectedProject?.name || '');
                                      
                                      // Reload media items and refresh project list
                                      loadMediaItems();
                                      refreshProjectList();
                                    } catch (error) {
                                      console.error('Error reassigning media:', error);
                                    }
                                  }}
                                  className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                >
                                  <option value="">No project assigned</option>
                                  {projects.map((project) => (
                                    <option key={project.id || project.name} value={project.id || project.name}>
                                      {project.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
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
                              <VideoThumbnail
                                videoUrl={item.url}
                                alt={item.title}
                                className="w-full h-32 rounded-lg"
                                showPlayButton={false}
                              />
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
                    </div>
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

        {activeTab === 'resume' && (
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Resume Management
            </h2>

            {resumeStatus.type && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                resumeStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {resumeStatus.message}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Resume */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Upload New Resume
                </h3>
                <form onSubmit={handleResumeUpload} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Resume File (PDF only)
                    </label>
                    <input
                      id="resume-file"
                      type="file"
                      onChange={handleResumeFileChange}
                      accept=".pdf"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Only PDF files are accepted. Maximum file size: 10MB
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploadingResume || !resumeFile}
                    className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploadingResume ? 'Uploading...' : 'Upload Resume'}
                  </button>
                </form>
              </div>

              {/* Current Resume */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Current Resume
                </h3>
                
                {currentResume ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-400 text-xl">📄</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            Resume.pdf
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Available for download
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <a
                        href={currentResume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-secondary flex-1 text-center"
                      >
                        View Resume
                      </a>
                      <a
                        href={currentResume}
                        download="resume.pdf"
                        className="button-primary flex-1 text-center"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gray-400 text-2xl">📄</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      No resume uploaded yet
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Upload your resume to make it available on your portfolio
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
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