import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './firebase';
import { User } from '../types/auth';

export const authService = {
  async register(email: string, password: string, displayName: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email || '',
      displayName,
      createdAt: new Date(),
    };
  },

  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'User',
      createdAt: user.metadata?.creationTime ? new Date(user.metadata.creationTime) : new Date(),
    };
  },

  async logout(): Promise<void> {
    await signOut(auth);
  },

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  getCurrentUser(): User | null {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || 'User',
      createdAt: firebaseUser.metadata?.creationTime
        ? new Date(firebaseUser.metadata.creationTime)
        : new Date(),
    };
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'User',
          createdAt: firebaseUser.metadata?.creationTime
            ? new Date(firebaseUser.metadata.creationTime)
            : new Date(),
        });
      } else {
        callback(null);
      }
    });
  },
};
