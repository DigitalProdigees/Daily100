import { router, usePathname } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { AuthService, AuthUser } from '../services/authService';
import { StorageService } from '../utils/storage';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    console.log('Setting up auth state listener...');
    console.log('Current auth state:', auth.currentUser ? `User: ${auth.currentUser.email}` : 'No user');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      console.log('Auth state changed:', firebaseUser ? `User logged in: ${firebaseUser.email}` : 'User logged out');
      console.log('Firebase user details:', firebaseUser ? {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified
      } : 'No user');
      
      if (firebaseUser) {
        const authUser = AuthService.convertToAuthUser(firebaseUser);
        setUser(authUser);
        
        // Store user data in AsyncStorage for additional persistence
        await StorageService.saveUserData(authUser);
        console.log('User data saved to storage:', authUser.email);
        
        // Automatically navigate based on current context
        console.log('Auth state listener - User authenticated, current path:', pathname);
        
        // Simple logic: if not on home screen, check profile setup status
        if (!pathname.startsWith('/(home)')) {
          console.log('Auth state listener - Existing user login, checking profile setup status');
          requestAnimationFrame(async () => {
            try {
              const hasCompletedProfileSetup = await StorageService.hasCompletedProfileSetup();
              console.log('Auth state listener - Profile setup status for existing user:', hasCompletedProfileSetup);
              
              if (hasCompletedProfileSetup) {
                console.log('Auth state listener - Profile setup completed, navigating to home');
                router.replace('/(home)/(tabs)');
              } else {
                console.log('Auth state listener - Profile setup not completed, navigating to profile');
                router.replace('/(home)/profile-information');
              }
            } catch (error) {
              console.error('Auth state listener - Error checking profile setup for existing user:', error);
              router.replace('/(home)/profile-information');
            }
          });
        } else {
          console.log('Auth state listener - Already on home screen, skipping navigation');
        }
      } else {
        setUser(null);
        // Clear user data on logout
        await StorageService.clearUserData();
        console.log('User logged out - data cleared');
        
        // Automatically navigate to login when user logs out
        console.log('Auth state listener - User logged out, current path:', pathname);
        // Only navigate if not already on auth screen
        if (!pathname.startsWith('/(auth)')) {
          console.log('Auth state listener - Navigating to login');
          // Use requestAnimationFrame to ensure navigation happens after render
          requestAnimationFrame(() => {
            try {
              router.replace('/(auth)/login');
              console.log('Auth state listener - Successfully navigated to login');
            } catch (error) {
              console.error('Auth state listener - Error navigating to login:', error);
            }
          });
        } else {
          console.log('Auth state listener - Already on auth screen, skipping navigation');
        }
      }
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      setLoading(true);
      await AuthService.signUp(email, password, displayName);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      console.log('Attempting to sign in user:', email);
      await AuthService.signIn(email, password);
      console.log('Sign in successful for:', email);
    } catch (err: any) {
      console.log('Sign in failed:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      await AuthService.signOut();
      // Clear user data from storage when explicitly logging out
      await StorageService.clearUserData();
      console.log('User explicitly logged out - data cleared');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await AuthService.resetPassword(email);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setError(null);
      await AuthService.updateUserPassword(newPassword);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateProfile = async (updates: { displayName?: string; photoURL?: string }) => {
    try {
      setError(null);
      await AuthService.updateUserProfile(updates);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isAuthenticated: !!user,
  };
};