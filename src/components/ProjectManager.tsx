'use client';

import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, Project } from '@/lib/projectService';
import { getMediaByProject, MediaItem } from '@/lib/mediaService';

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectMediaMap, setProjectMediaMap] = useState<Record<string, MediaItem[]>>({});
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    imageUrl: '',
    featuredMediaId: '',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
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
      setProjectMediaMap(mediaMap);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    try {
      const projectData = {
        name: formData.name,
        description: formData.description,
        technologies: formData.technologies ? formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech) : [],
        liveUrl: formData.liveUrl || '#',
        githubUrl: formData.githubUrl || '#',
        imageUrl: formData.imageUrl || '',
        featuredMediaId: formData.featuredMediaId || '',
      };

      if (editingProject && editingProject.id) {
        await updateProject(editingProject.id, projectData);
        setStatus({
          type: 'success',
          message: 'Project updated successfully!',
        });
      } else {
        await createProject(projectData);
        setStatus({
          type: 'success',
          message: 'Project created successfully!',
        });
      }

      setFormData({
        name: '',
        description: '',
        technologies: '',
        liveUrl: '',
        githubUrl: '',
        imageUrl: '',
        featuredMediaId: '',
      });
      setIsAddingProject(false);
      setEditingProject(null);
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      setStatus({
        type: 'error',
        message: `Failed to save project: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      imageUrl: project.imageUrl || '',
      featuredMediaId: project.featuredMediaId || '',
    });
    setIsAddingProject(true);
  };

  const handleCancel = () => {
    setIsAddingProject(false);
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      imageUrl: '',
      featuredMediaId: '',
    });
  };

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Project Management
        </h2>
        <button
          onClick={() => setIsAddingProject(true)}
          className="button-primary"
        >
          Add New Project
        </button>
      </div>

      {status.type && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          status.type === 'success' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {status.message}
        </div>
      )}

      {isAddingProject && (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="E-Commerce Platform"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="A modern e-commerce solution with React and Node.js"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Live URL (optional)
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="https://project-demo.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  GitHub URL (optional)
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Image URL (optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="https://example.com/project-image.jpg"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Featured Media (optional)
              </label>
              <select
                name="featuredMediaId"
                value={formData.featuredMediaId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">No featured media</option>
                {projects.map((project) => {
                  // Get media for this project
                  const projectMedia = projectMediaMap[project.id || project.name] || [];
                  return projectMedia.map((media) => (
                    <option key={media.id} value={media.id}>
                      {media.title} ({media.type}) - {project.name}
                    </option>
                  ));
                })}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Select which media item should be featured for this project
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="button-primary"
              >
                {editingProject ? 'Update Project' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="button-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <span className="mr-4">Live: {project.liveUrl}</span>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <span>GitHub: {project.githubUrl}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleEdit(project)}
                className="ml-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No projects created yet. Add your first project!
          </p>
        )}
      </div>
    </div>
  );
} 