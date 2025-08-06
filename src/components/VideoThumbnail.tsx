'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoThumbnailProps {
  videoUrl: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  showPlayButton?: boolean;
}

export default function VideoThumbnail({ 
  videoUrl, 
  alt, 
  className = '', 
  onClick,
  showPlayButton = true 
}: VideoThumbnailProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateThumbnail = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Set canvas size
      canvas.width = video.videoWidth || 400;
      canvas.height = video.videoHeight || 300;

      // Draw the first frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to data URL
      const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setThumbnailUrl(thumbnailDataUrl);
      setIsLoading(false);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', generateThumbnail);
      video.addEventListener('error', () => {
        setIsLoading(false);
        // Fallback to video poster if thumbnail generation fails
        setThumbnailUrl(videoUrl + '?thumb=1');
      });

      return () => {
        video.removeEventListener('loadeddata', generateThumbnail);
        video.removeEventListener('error', () => {});
      };
    }
  }, [videoUrl]);

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {/* Hidden video element for thumbnail generation */}
      <video
        ref={videoRef}
        src={videoUrl}
        preload="metadata"
        muted
        style={{ display: 'none' }}
      />
      
      {/* Hidden canvas for thumbnail generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Thumbnail display */}
      {isLoading ? (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <img
            src={thumbnailUrl || videoUrl + '?thumb=1'}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => {
              // Fallback to video poster
              setThumbnailUrl(videoUrl + '?thumb=1');
            }}
          />
          
          {showPlayButton && onClick && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 group-hover:opacity-100">
              <div className="bg-black/60 hover:bg-black/80 rounded-full p-4 transition-colors">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
          
          {showPlayButton && onClick && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              Click to play
            </div>
          )}
        </div>
      )}
    </div>
  );
} 