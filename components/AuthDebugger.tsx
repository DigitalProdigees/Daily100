import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';

export const AuthDebugger: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuthContext();

  if (__DEV__) {
    return (
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>Auth Debug:</Text>
        <Text style={styles.debugText}>Loading: {loading ? 'Yes' : 'No'}</Text>
        <Text style={styles.debugText}>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</Text>
        <Text style={styles.debugText}>User: {user ? user.email : 'None'}</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  debugContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  debugText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
  },
});