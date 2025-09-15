import {
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
    User,
    UserCredential,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export class AuthService {
  // Sign up with email and password
  static async signUp(email: string, password: string, displayName?: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
      }
      
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Sign in with email and password
  static async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  // Sign out
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  // Send password reset email
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  }

  // Update user password
  static async updateUserPassword(newPassword: string): Promise<void> {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
      } else {
        throw new Error('No user is currently signed in');
      }
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  static async updateUserProfile(updates: { displayName?: string; photoURL?: string }): Promise<void> {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, updates);
      } else {
        throw new Error('No user is currently signed in');
      }
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Convert Firebase User to AuthUser
  static convertToAuthUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return auth.currentUser !== null;
  }

  // Check if email is already registered
  static async isEmailRegistered(email: string): Promise<boolean> {
    try {
      console.log('AuthService - Checking if email is registered:', email);
      
      // Try fetchSignInMethodsForEmail first
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        console.log('AuthService - Sign in methods found:', signInMethods);
        const isRegistered = signInMethods.length > 0;
        console.log('AuthService - Email registered (fetchSignInMethods):', isRegistered);
        return isRegistered;
      } catch (fetchError) {
        console.log('AuthService - fetchSignInMethodsForEmail failed, trying alternative method');
        
        // Fallback: Try to sign in with a dummy password
        // If email exists, it will give "wrong password" error
        // If email doesn't exist, it will give "user not found" error
        try {
          await signInWithEmailAndPassword(auth, email, 'dummy_password_for_check');
          // This should never succeed, but if it does, email exists
          console.log('AuthService - Unexpected: sign in with dummy password succeeded');
          return true;
        } catch (signInError: any) {
          if (signInError.code === 'auth/user-not-found') {
            console.log('AuthService - Email not registered (user-not-found)');
            return false;
          } else if (signInError.code === 'auth/wrong-password') {
            console.log('AuthService - Email is registered (wrong-password)');
            return true;
          } else {
            console.log('AuthService - Other sign in error:', signInError.code);
            // For other errors, assume email is available
            return false;
          }
        }
      }
    } catch (error) {
      console.error('AuthService - Error checking email registration:', error);
      // If there's an error, assume email is available
      return false;
    }
  }
}