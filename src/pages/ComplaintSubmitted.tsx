import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useComplaintDetail } from '../hooks/useComplaints';
import { generateComplaintIdDisplay } from '../utils/complaintId';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../components/ui/LoadingState';
import { CheckCircle, MapPin } from 'lucide-react';

export const ComplaintSubmitted: React.FC = () => {
  const { complaintId } = useParams<{ complaintId: string }>();
  const navigate = useNavigate();
  const { complaint, loading } = useComplaintDetail(complaintId || null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSuccess(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingState message="Processing your report..." />;
  if (!complaint) return <LoadingState />;

  const displayId = generateComplaintIdDisplay(complaint.id, complaint.createdAt);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white rounded-lg shadow-2xl p-8 text-center"
      >
        {/* Success Animation */}
        {showSuccess && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <CheckCircle size={80} className="text-green-500" />
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Submitted!</h1>
          <p className="text-gray-600 mb-8">Your civic issue has been successfully submitted.</p>

          {/* Complaint ID */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-8 border border-blue-200"
          >
            <p className="text-sm text-gray-600 mb-2">Your Complaint ID</p>
            <p className="text-3xl font-bold text-blue-600 font-mono">{displayId}</p>
            <p className="text-xs text-gray-600 mt-3">Save this ID to track your report</p>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-left bg-gray-50 rounded-lg p-6 mb-8 space-y-3"
          >
            <div>
              <p className="text-sm text-gray-600">Issue</p>
              <p className="font-medium text-gray-900">{complaint.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{complaint.address}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium text-blue-600">Submitted</p>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left"
          >
            <p className="font-medium text-gray-900 mb-2">What's Next?</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Your report has been added to our system</li>
              <li>✓ It will be reviewed by our team</li>
              <li>✓ You'll receive updates on its progress</li>
            </ul>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate(`/complaint/${complaint.id}`)}
              className="w-full"
            >
              View Full Report
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/my-complaints')}
              className="w-full"
            >
              Go to My Complaints
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/home')}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
