import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/auth';
import { authService } from '../services/authService';
import { notificationService } from '../services/notificationService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const newUser = await authService.register(email, password, displayName);
      setUser(newUser);
      notificationService.success('Registration successful!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      notificationService.error(message);
      throw err;
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const authUser = await authService.login(email, password);
      setUser(authUser);
      notificationService.success('Logged in successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      notificationService.error(message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await authService.logout();
      setUser(null);
      notificationService.success('Logged out successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      notificationService.error(message);
      throw err;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setError(null);
      await authService.resetPassword(email);
      notificationService.success('Password reset email sent!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setError(message);
      notificationService.error(message);
      throw err;
    }
  }, []);

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword,
  };
}
