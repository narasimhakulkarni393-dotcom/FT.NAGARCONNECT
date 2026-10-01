import { useState, useEffect, useCallback } from 'react';
import { Complaint } from '../types/complaint';
import { complaintService } from '../services/complaintService';
import { notificationService } from '../services/notificationService';

export function useComplaints(userId: string | null) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setComplaints([]);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = complaintService.onUserComplaintsSnapshot(userId, (fetchedComplaints) => {
      setComplaints(fetchedComplaints);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  return {
    complaints,
    loading,
    error,
  };
}

export function useComplaintDetail(complaintId: string | null) {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!complaintId) {
      setComplaint(null);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = complaintService.onComplaintSnapshot(complaintId, (fetchedComplaint) => {
      setComplaint(fetchedComplaint);
      setLoading(false);
    });

    return unsubscribe;
  }, [complaintId]);

  return {
    complaint,
    loading,
    error,
  };
}
