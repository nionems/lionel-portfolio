'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { createCaseStudy, defaultCaseStudies } from '@/lib/caseStudyService';

export default function AdminSetup() {
  const [email, setEmail] = useState('admin@lionelportfolio.com');
  const [password, setPassword] = useState('admin123456');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPopulatingCaseStudies, setIsPopulatingCaseStudies] = useState(false);
  const [caseStudiesStatus, setCaseStudiesStatus] = useState('');
  const router = useRouter();

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Admin user created successfully! You can now login.');
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/email-already-in-use') {
        setError('Admin user already exists. You can login with these credentials.');
      } else if (error && typeof error === 'object' && 'message' in error) {
        setError((error as { message: string }).message || 'Failed to create admin user');
      } else {
        setError('Failed to create admin user');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopulateCaseStudies = async () => {
    setIsPopulatingCaseStudies(true);
    setCaseStudiesStatus('');

    try {
      let createdCount = 0;
      for (const caseStudy of defaultCaseStudies) {
        try {
          await createCaseStudy(caseStudy);
          createdCount++;
        } catch (error) {
          console.error('Error creating case study:', error);
        }
      }
      
      if (createdCount > 0) {
        setCaseStudiesStatus(`Successfully created ${createdCount} case studies!`);
      } else {
        setCaseStudiesStatus('No case studies were created. They may already exist.');
      }
    } catch (error) {
      setCaseStudiesStatus('Error populating case studies. Please try again.');
    } finally {
      setIsPopulatingCaseStudies(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text">Admin Setup</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Create admin user for portfolio management</p>
        </div>
        
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-lg text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={handleCreateAdmin} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="admin@lionelportfolio.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Admin...' : 'Create Admin User'}
            </button>
          </form>
          
          <div className="mt-6 space-y-4">
            <button
              type="button"
              onClick={handlePopulateCaseStudies}
              disabled={isPopulatingCaseStudies}
              className="w-full button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPopulatingCaseStudies ? 'Populating...' : 'Populate Default Case Studies'}
            </button>
            
            {caseStudiesStatus && (
              <div className={`p-3 rounded-lg text-sm ${
                caseStudiesStatus.includes('Successfully') 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : caseStudiesStatus.includes('Error')
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {caseStudiesStatus}
              </div>
            )}
            
            <div className="text-center">
              <a 
                href="/admin/login" 
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Already have an account? Login here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 