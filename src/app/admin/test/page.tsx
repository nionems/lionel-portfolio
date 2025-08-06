'use client';

import { useAuth } from '@/components/AuthProvider';

export default function AdminTest() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text">Auth Test</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Authentication Status</p>
        </div>
        
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
          <div className="space-y-4">
            <div>
              <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>User:</strong> {user ? 'Logged In' : 'Not Logged In'}
            </div>
            {user && (
              <div>
                <strong>Email:</strong> {user.email}
              </div>
            )}
            <div>
              <strong>User ID:</strong> {user?.uid || 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 