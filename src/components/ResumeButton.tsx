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
        className="button-primary text-center opacity-50 cursor-not-allowed"
      >
        📄 Loading...
      </button>
    );
  }

  if (!resumeUrl) {
    return (
      <button 
        disabled
        className="button-primary text-center opacity-50 cursor-not-allowed"
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
      className="button-primary text-center"
    >
      📄 My Resume
    </a>
  );
} 