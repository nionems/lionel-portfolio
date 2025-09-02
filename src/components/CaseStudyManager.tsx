'use client';

import { useState, useEffect } from 'react';
import { 
  createCaseStudy, 
  updateCaseStudy, 
  deleteCaseStudy, 
  getCaseStudies,
  type CaseStudy 
} from '../lib/caseStudyService';
import { getMediaItems } from '../lib/mediaService';

export default function CaseStudyManager() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    role: '',
    description: '',
    challenge: '',
    solution: '',
    result: '',
    technologies: '',
    featuredMediaId: '',
    projectDate: ''
  });

  useEffect(() => {
    loadCaseStudies();
    loadMediaItems();
  }, []);

  const loadCaseStudies = async () => {
    try {
      const data = await getCaseStudies();
      setCaseStudies(data);
    } catch (error) {
      console.error('Error loading case studies:', error);
      setMessage('Error loading case studies');
    }
  };

  const loadMediaItems = async () => {
    try {
      const data = await getMediaItems();
      setMediaItems(data);
    } catch (error) {
      console.error('Error loading media items:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      if (isEditing && editingCaseStudy?.id) {
        // Update existing case study
        const technologies = formData.technologies ? formData.technologies.split(',').map(t => t.trim()) : [];
        const updateData = {
          ...formData,
          technologies,
        };
        
        // Only include featuredMediaId if it's not empty
        if (formData.featuredMediaId && formData.featuredMediaId.trim() !== '') {
          updateData.featuredMediaId = formData.featuredMediaId;
        }
        
        console.log('Updating case study with data:', updateData);
        await updateCaseStudy(editingCaseStudy.id, updateData);
        setMessage('Case study updated successfully!');
      } else {
        // Create new case study
        const technologies = formData.technologies ? formData.technologies.split(',').map(t => t.trim()) : [];
        const createData = {
          ...formData,
          technologies,
        };
        
        // Only include featuredMediaId if it's not empty
        if (formData.featuredMediaId && formData.featuredMediaId.trim() !== '') {
          createData.featuredMediaId = formData.featuredMediaId;
        }
        
        console.log('Creating case study with data:', createData);
        await createCaseStudy(createData);
        setMessage('Case study created successfully!');
      }

      // Reset form and reload data
      resetForm();
      await loadCaseStudies();
    } catch (error) {
      console.error('Error saving case study:', error);
      setMessage('Error saving case study');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setIsEditing(true);
    setFormData({
      title: caseStudy.title,
      subtitle: caseStudy.subtitle,
      role: caseStudy.role,
      description: caseStudy.description,
      challenge: caseStudy.challenge,
      solution: caseStudy.solution,
      result: caseStudy.result,
      technologies: caseStudy.technologies.join(', '),
      featuredMediaId: caseStudy.featuredMediaId || '',
      projectDate: caseStudy.projectDate
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      try {
        await deleteCaseStudy(id);
        setMessage('Case study deleted successfully!');
        await loadCaseStudies();
      } catch (error) {
        console.error('Error deleting case study:', error);
        setMessage('Error deleting case study');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      role: '',
      description: '',
      challenge: '',
      solution: '',
      result: '',
      technologies: '',
      featuredMediaId: '',
      projectDate: ''
    });
    setIsEditing(false);
    setEditingCaseStudy(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Case Study' : 'Create New Case Study'}
        </h2>
        {isEditing && (
          <button
            onClick={resetForm}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle *
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role *
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Challenge *
            </label>
            <textarea
              name="challenge"
              value={formData.challenge}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Solution *
            </label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Result *
            </label>
            <textarea
              name="result"
              value={formData.result}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies (comma-separated) *
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              required
              placeholder="React, Node.js, MongoDB, AWS"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Date *
            </label>
            <input
              type="date"
              name="projectDate"
              value={formData.projectDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Media (optional)
          </label>
          <select
            name="featuredMediaId"
            value={formData.featuredMediaId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select media item</option>
            {mediaItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({item.type})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : (isEditing ? 'Update Case Study' : 'Create Case Study')}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Existing Case Studies</h3>
        <div className="space-y-4">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{caseStudy.title}</h4>
                  <p className="text-sm text-gray-600">{caseStudy.subtitle}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(caseStudy)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => caseStudy.id && handleDelete(caseStudy.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Role:</span> {caseStudy.role}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Date:</span> {caseStudy.projectDate}
              </p>
              <div className="flex flex-wrap gap-1">
                {caseStudy.technologies.map((tech, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
