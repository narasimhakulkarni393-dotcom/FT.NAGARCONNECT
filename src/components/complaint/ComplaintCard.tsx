import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Complaint } from '../../types/complaint';
import { Card } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { formatRelativeTime } from '../../utils/formatDate';
import { generateComplaintIdDisplay } from '../../utils/complaintId';
import { MapPin, Clock } from 'lucide-react';

interface ComplaintCardProps {
  complaint: Complaint;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  const complaintId = generateComplaintIdDisplay(complaint.id, complaint.createdAt);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/complaint/${complaint.id}`}>
        <Card className="overflow-hidden cursor-pointer p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{complaint.title}</h3>
              <p className="text-sm font-mono text-gray-500">{complaintId}</p>
            </div>
            <StatusBadge status={complaint.status} />
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{complaint.description}</p>

          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="truncate">{complaint.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{formatRelativeTime(complaint.createdAt)}</span>
            </div>
          </div>

          {complaint.images.length > 0 && (
            <div className="mt-4 flex gap-2">
              {complaint.images.slice(0, 3).map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Complaint ${idx + 1}`}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              ))}
              {complaint.images.length > 3 && (
                <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                  +{complaint.images.length - 3}
                </div>
              )}
            </div>
          )}
        </Card>
      </Link>
    </motion.div>
  );
};
