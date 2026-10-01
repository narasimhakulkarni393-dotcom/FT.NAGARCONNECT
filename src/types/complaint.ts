export type ComplaintStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export type ComplaintCategory =
  | 'ROAD_DAMAGE'
  | 'GARBAGE'
  | 'STREETLIGHT'
  | 'WATER_LEAKAGE'
  | 'DRAINAGE'
  | 'PUBLIC_INFRASTRUCTURE'
  | 'OTHER';

export interface Complaint {
  id: string;
  userId: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  images: string[];
  status: ComplaintStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComplaintFormData {
  category: ComplaintCategory;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  images: File[];
}
