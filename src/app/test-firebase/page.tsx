'use client';

import { useState, useEffect } from 'react';

export default function TestFirebase() {
  const [status, setStatus] = useState('Testing Firebase connection...');
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    const testFirebase = async () => {
      try {
        // Check environment variables
        const env = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        };
        
        setEnvVars(env);
        
        // Check if any env vars are missing
        const missingVars = Object.entries(env).filter(([key, value]) => !value);
        
        if (missingVars.length > 0) {
          setStatus(`❌ Missing environment variables: ${missingVars.map(([key]) => key).join(', ')}`);
          return;
        }
        
        // Try to initialize Firebase
        const { initializeApp } = await import('firebase/app');
        const { getFirestore, collection, getDocs } = await import('firebase/firestore');
        
        const app = initializeApp(env);
        const db = getFirestore(app);
        
        // Try to read from Firestore
        const testCollection = collection(db, 'contactMessages');
        const snapshot = await getDocs(testCollection);
        
        setStatus(`✅ Firebase connected successfully! Found ${snapshot.size} contact messages.`);
        
      } catch (error) {
        console.error('Firebase test error:', error);
        setStatus(`❌ Firebase error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    testFirebase();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Firebase Connection Test</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <p className="text-lg">{status}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-mono text-sm">{key}:</span>
                <span className={`font-mono text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                  {value ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
