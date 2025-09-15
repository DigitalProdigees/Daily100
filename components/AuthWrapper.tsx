import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      checkAuthState();
    }
  }, [isMounted, isAuthenticated, loading]);

  const checkAuthState = async () => {
    if (!loading && isMounted) {
      console.log('AuthWrapper - User is authenticated, allowing access to home screens');
      setIsCheckingAuth(false);
    }
  };

  if (loading || isCheckingAuth || !isMounted) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D11A38" />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});