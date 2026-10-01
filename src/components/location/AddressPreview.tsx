import React from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '../ui/Card';

interface AddressPreviewProps {
  address: string;
  latitude?: number;
  longitude?: number;
}

export const AddressPreview: React.FC<AddressPreviewProps> = ({
  address,
  latitude,
  longitude,
}) => (
  <Card className="p-4">
    <div className="flex items-start gap-3">
      <MapPin className="flex-shrink-0 text-blue-600 mt-1" size={20} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">Selected Location</p>
        <p className="text-sm text-gray-600 mt-1 break-words">{address}</p>
        {latitude && longitude && (
          <p className="text-xs text-gray-500 mt-2">
            {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
          </p>
        )}
      </div>
    </div>
  </Card>
);
