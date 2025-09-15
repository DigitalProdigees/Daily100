# Firebase Authentication Setup

This project has been configured with Firebase Authentication. Here's what has been set up and how to use it.

## Files Created

### 1. Firebase Configuration
- **File**: `config/firebase.ts`
- **Purpose**: Contains Firebase app initialization and configuration
- **Exports**: `auth`, `db`, `analytics`, and default `app`

### 2. Authentication Service
- **File**: `services/authService.ts`
- **Purpose**: Contains all authentication methods
- **Methods**: signUp, signIn, signOut, resetPassword, updatePassword, updateProfile

### 3. Authentication Hook
- **File**: `hooks/useAuth.ts`
- **Purpose**: React hook for authentication state management
- **Returns**: user, loading, error, and all auth methods

### 4. Authentication Context
- **File**: `contexts/AuthContext.tsx`
- **Purpose**: Global authentication state management
- **Components**: AuthProvider, useAuthContext

### 5. Protected Routes
- **File**: `components/ProtectedRoute.tsx`
- **Purpose**: Components for protecting routes based on authentication
- **Components**: ProtectedRoute, PublicRoute

### 6. Example Implementation
- **File**: `examples/LoginWithFirebase.tsx`
- **Purpose**: Example of how to integrate Firebase auth in your login screen

## Dependencies Installed

```bash
npm install firebase @react-native-firebase/app @react-native-firebase/auth
```

## How to Use

### 1. Wrap your app with AuthProvider

In your main layout file (`app/_layout.tsx`), wrap your app with the AuthProvider:

```tsx
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Your app content */}
    </AuthProvider>
  );
}
```

### 2. Use authentication in your components

```tsx
import { useAuthContext } from '../contexts/AuthContext';

export default function MyComponent() {
  const { user, signIn, signOut, loading } = useAuthContext();

  const handleLogin = async () => {
    try {
      await signIn('user@example.com', 'password');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View>
      {user ? (
        <Text>Welcome, {user.displayName || user.email}!</Text>
      ) : (
        <Text>Please sign in</Text>
      )}
    </View>
  );
}
```

### 3. Protect routes

```tsx
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function ProtectedScreen() {
  return (
    <ProtectedRoute>
      <Text>This content is only visible to authenticated users</Text>
    </ProtectedRoute>
  );
}
```

### 4. Handle public routes (redirect if authenticated)

```tsx
import { PublicRoute } from '../components/ProtectedRoute';

export default function LoginScreen() {
  return (
    <PublicRoute>
      <Text>Login form</Text>
    </PublicRoute>
  );
}
```

## Available Authentication Methods

- `signUp(email, password, displayName?)` - Create new user account
- `signIn(email, password)` - Sign in existing user
- `signOut()` - Sign out current user
- `resetPassword(email)` - Send password reset email
- `updatePassword(newPassword)` - Update user password
- `updateProfile(updates)` - Update user profile (displayName, photoURL)

## Authentication State

The `useAuthContext` hook provides:
- `user` - Current user object or null
- `loading` - Boolean indicating if auth operation is in progress
- `error` - String containing any error messages
- `isAuthenticated` - Boolean indicating if user is signed in

## Firebase Configuration

Your Firebase project is configured with:
- **Project ID**: mydaily100-c31ee
- **Auth Domain**: mydaily100-c31ee.firebaseapp.com
- **Storage Bucket**: mydaily100-c31ee.firebasestorage.app

## Next Steps

1. Enable Authentication methods in Firebase Console
2. Set up authentication rules in Firebase Console
3. Configure email templates for password reset
4. Add social authentication if needed (Google, Facebook, etc.)
5. Set up Firestore security rules
6. Test authentication flow in your app

## Security Notes

- Never commit Firebase config with real API keys to public repositories
- Use environment variables for production
- Set up proper Firestore security rules
- Enable App Check for additional security