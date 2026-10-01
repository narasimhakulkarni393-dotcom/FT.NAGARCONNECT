import { useState, useCallback } from 'react';
import { LocationData } from '../types/location';
import { locationService } from '../services/locationService';
import { notificationService } from '../services/notificationService';

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const coords = await locationService.getCurrentLocation();
      const address = await locationService.reverseGeocode(coords.latitude, coords.longitude);

      setLocation({
        ...coords,
        address,
        timestamp: new Date(),
      });

      notificationService.success('Location detected successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to detect location';
      setError(message);
      notificationService.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const setManualLocation = useCallback(
    async (latitude: number, longitude: number) => {
      setError(null);
      setLoading(true);

      try {
        const address = await locationService.reverseGeocode(latitude, longitude);
        setLocation({
          latitude,
          longitude,
          address,
          timestamp: new Date(),
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to set location';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  return {
    location,
    loading,
    error,
    detectLocation,
    setManualLocation,
    clearLocation,
  };
}
