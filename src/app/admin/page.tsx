export default function AdminIndex() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text">Admin Panel</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Choose an option</p>
        </div>
        
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
          <div className="space-y-4">
            <a 
              href="/admin/login"
              className="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Login
            </a>
            
            <a 
              href="/admin/setup"
              className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Setup Admin User
            </a>
            
            <a 
              href="/admin/test"
              className="block w-full text-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Test Authentication
            </a>
            
            <a 
              href="/admin/dashboard"
              className="block w-full text-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 