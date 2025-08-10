'use client';

export default function ProfileImage() {
  return (
    <div className="flex justify-center mb-4 md:mb-6">
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden ring-4 ring-purple-200 dark:ring-purple-800 shadow-lg bg-gray-100 dark:bg-gray-700">
        <img
          src="/images/FA2_5340_2_edited.png"
          alt="Lionel - Developer"
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/DSC_5830_edited.png';
          }}
        />
      </div>
    </div>
  );
} 