import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLocation } from '../../hooks/useLocation';

interface LocationDetectorProps {
  onLocationSelected: (latitude: number, longitude: number, address: string) => void;
}

export const LocationDetector: React.FC<LocationDetectorProps> = ({ onLocationSelected }) => {
  const { location, loading, error, detectLocation } = useLocation();

  const handleDetect = async () => {
    await detectLocation();
  };

  React.useEffect(() => {
    if (location) {
      onLocationSelected(location.latitude, location.longitude, location.address);
    }
  }, [location, onLocationSelected]);

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        onClick={handleDetect}
        loading={loading}
        className="w-full flex items-center justify-center gap-2"
      >
        <MapPin size={16} />
        Use My Current Location
      </Button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {location && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-800">✓ Location detected</p>
          <p className="text-sm text-green-700 mt-1">{location.address}</p>
        </div>
      )}
    </div>
  );
};
