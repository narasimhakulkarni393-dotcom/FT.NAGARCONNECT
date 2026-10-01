import React from 'react';
import { useParams } from 'react-router-dom';
import { useComplaintDetail } from '../hooks/useComplaints';
import { LoadingState } from '../components/ui/LoadingState';
import { EmptyState } from '../components/ui/EmptyState';
import { Card } from '../components/ui/Card';
import { ComplaintStatusTimeline } from '../components/complaint/ComplaintStatus';
import { ComplaintImage } from '../components/complaint/ComplaintImage';
import { StatusBadge } from '../components/ui/StatusBadge';
import { formatDateTime } from '../utils/formatDate';
import { generateComplaintIdDisplay } from '../utils/complaintId';
import { MapPin, Calendar, Tag } from 'lucide-react';

export const ComplaintDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { complaint, loading } = useComplaintDetail(id || null);

  if (loading) return <LoadingState message="Loading complaint details..." />;
  if (!complaint) return <EmptyState title="Complaint not found" description="This complaint doesn't exist or has been removed." />;

  const complaintIdDisplay = generateComplaintIdDisplay(complaint.id, complaint.createdAt);
  const categoryLabel = complaint.category.replace(/_/g, ' ');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{complaint.title}</h1>
            <p className="text-gray-600 mt-2 font-mono">{complaintIdDisplay}</p>
          </div>
          <StatusBadge status={complaint.status} />
        </div>
      </div>

      <div className="grid gap-8">
        {/* Main Details */}
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Issue Details</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Description</h3>
              <p className="text-gray-900">{complaint.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Tag className="text-gray-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Category</p>
                  <p className="text-gray-900 capitalize">{categoryLabel}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-gray-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-gray-900">{complaint.address}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {complaint.latitude.toFixed(4)}°N, {complaint.longitude.toFixed(4)}°E
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-gray-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Submitted</p>
                  <p className="text-gray-900">{formatDateTime(complaint.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="text-gray-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Updated</p>
                  <p className="text-gray-900">{formatDateTime(complaint.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Images */}
        {complaint.images.length > 0 && (
          <Card className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Uploaded Photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complaint.images.map((image, idx) => (
                <ComplaintImage
                  key={idx}
                  imageUrl={image}
                  alt={`Complaint photo ${idx + 1}`}
                />
              ))}
            </div>
          </Card>
        )}

        {/* Status Timeline */}
        <Card className="p-8">
          <ComplaintStatusTimeline currentStatus={complaint.status} />
        </Card>
      </div>
    </div>
  );
};
