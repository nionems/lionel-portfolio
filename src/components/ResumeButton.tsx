'use client';

import { useState, useEffect } from 'react';
import { getResumeUrl } from '@/lib/resumeService';

export default function ResumeButton() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResumeUrl = async () => {
      try {
        const url = await getResumeUrl();
        setResumeUrl(url);
      } catch (error) {
        console.error('Error loading resume URL:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResumeUrl();
  }, []);

  if (loading) {
    return (
      <button 
        disabled
        className="button-secondary text-center bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 border-green-600 hover:border-green-700 dark:border-green-600 dark:hover:border-green-700 opacity-50 cursor-not-allowed"
      >
        📄 Loading...
      </button>
    );
  }

  if (!resumeUrl) {
    return (
      <button 
        disabled
        className="button-secondary text-center bg-gray-400 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600 border-gray-400 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-600 opacity-50 cursor-not-allowed"
        title="Resume not available"
      >
        📄 Resume Unavailable
      </button>
    );
  }

  return (
    <a 
      href={resumeUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="button-secondary text-center bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 border-green-600 hover:border-green-700 dark:border-green-600 dark:hover:border-green-700"
    >
      📄 My Resume
    </a>
  );
} 