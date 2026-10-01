import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Complaint, ComplaintStatus } from '../types/complaint';

const COMPLAINTS_COLLECTION = 'complaints';

export const complaintService = {
  async createComplaint(
    userId: string,
    category: string,
    title: string,
    description: string,
    address: string,
    latitude: number,
    longitude: number,
    images: string[]
  ): Promise<string> {
    const docRef = await addDoc(collection(db, COMPLAINTS_COLLECTION), {
      userId,
      category,
      title,
      description,
      address,
      latitude,
      longitude,
      images,
      status: 'SUBMITTED',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  },

  async getComplaintById(complaintId: string): Promise<Complaint | null> {
    const docRef = doc(db, COMPLAINTS_COLLECTION, complaintId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();
    return {
      id: docSnap.id,
      userId: data.userId,
      category: data.category,
      title: data.title,
      description: data.description,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      images: data.images || [],
      status: data.status,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  },

  async getUserComplaints(userId: string): Promise<Complaint[]> {
    const q = query(
      collection(db, COMPLAINTS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        category: data.category,
        title: data.title,
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        images: data.images || [],
        status: data.status,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    });
  },

  onUserComplaintsSnapshot(
    userId: string,
    callback: (complaints: Complaint[]) => void
  ): () => void {
    const q = query(
      collection(db, COMPLAINTS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const complaints = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          category: data.category,
          title: data.title,
          description: data.description,
          address: data.address,
          latitude: data.latitude,
          longitude: data.longitude,
          images: data.images || [],
          status: data.status,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });

      callback(complaints);
    });
  },

  onComplaintSnapshot(complaintId: string, callback: (complaint: Complaint | null) => void): () => void {
    const docRef = doc(db, COMPLAINTS_COLLECTION, complaintId);
    return onSnapshot(docRef, (docSnap) => {
      if (!docSnap.exists()) {
        callback(null);
        return;
      }

      const data = docSnap.data();
      callback({
        id: docSnap.id,
        userId: data.userId,
        category: data.category,
        title: data.title,
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        images: data.images || [],
        status: data.status,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });
  },
};
