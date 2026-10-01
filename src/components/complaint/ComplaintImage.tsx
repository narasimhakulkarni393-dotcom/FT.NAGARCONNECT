import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ComplaintImageProps {
  imageUrl: string;
  alt: string;
  onRemove?: () => void;
}

export const ComplaintImage: React.FC<ComplaintImageProps> = ({ imageUrl, alt, onRemove }) => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  return (
    <>
      <div className="relative group">
        <img
          src={imageUrl}
          alt={alt}
          className="h-48 w-full rounded-lg object-cover cursor-pointer"
          onClick={() => setShowFullscreen(true)}
        />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <img src={imageUrl} alt={alt} className="max-h-full max-w-full" />
        </div>
      )}
    </>
  );
};
