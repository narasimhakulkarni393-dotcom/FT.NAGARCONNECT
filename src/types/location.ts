export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData extends LocationCoordinates {
  address: string;
  timestamp: Date;
}

export interface GeocodeResult {
  address: string;
  latitude: number;
  longitude: number;
}
