import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useComplaints } from '../hooks/useComplaints';
import { ComplaintCard } from '../components/complaint/ComplaintCard';
import { EmptyState } from '../components/ui/EmptyState';
import { LoadingState } from '../components/ui/LoadingState';
import { Link } from 'react-router-dom';

export const MyComplaints: React.FC = () => {
  const { user } = useAuth();
  const { complaints, loading } = useComplaints(user?.uid || null);

  if (loading) return <LoadingState message="Loading your complaints..." />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Complaints</h1>

      {complaints.length === 0 ? (
        <EmptyState
          title="No complaints yet"
          description="You haven't submitted any civic issues yet."
          actionLabel="Report an Issue"
          onAction={() => window.location.href = '/report'}
        />
      ) : (
        <div className="grid gap-6">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
};
