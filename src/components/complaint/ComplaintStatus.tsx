import React from 'react';
import { motion } from 'framer-motion';
import { ComplaintStatus } from '../../types/complaint';
import { CheckCircle, Clock } from 'lucide-react';

interface ComplaintStatusProps {
  currentStatus: ComplaintStatus;
}

const STATUS_ORDER: ComplaintStatus[] = ['SUBMITTED', 'UNDER_REVIEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

const STATUS_LABELS = {
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

export const ComplaintStatusTimeline: React.FC<ComplaintStatusProps> = ({ currentStatus }) => {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="py-8">
      <h3 className="text-lg font-semibold mb-6">Status Timeline</h3>
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute left-0 right-0 h-1 bg-gray-200 top-6" />
        <div
          className="absolute left-0 h-1 bg-blue-600 top-6 transition-all duration-500"
          style={{ width: `${(currentIndex / (STATUS_ORDER.length - 1)) * 100}%` }}
        />

        {/* Status nodes */}
        <div className="flex justify-between w-full relative z-10">
          {STATUS_ORDER.map((status, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <motion.div
                key={status}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`
                    flex items-center justify-center h-12 w-12 rounded-full border-4 transition-all
                    ${isCurrent ? 'border-blue-600 bg-blue-50 scale-110' : 'border-gray-200'}
                    ${isCompleted && !isCurrent ? 'bg-blue-600 border-blue-600' : ''}
                    ${!isCompleted ? 'bg-white' : ''}
                  `}
                  whileScale={{ scale: isCurrent ? 1.15 : 1 }}
                >
                  {isCompleted && !isCurrent ? (
                    <CheckCircle size={24} className="text-white" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-blue-600"
                    >
                      <Clock size={24} />
                    </motion.div>
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-300" />
                  )}
                </motion.div>
                <p className="text-sm font-medium text-gray-700 mt-3 text-center">
                  {STATUS_LABELS[status]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
