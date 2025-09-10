import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
  style?: any;
}

export default function LoadingOverlay({ 
  visible, 
  text = 'Loading...', 
  style 
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <View style={[styles.loadingOverlay, style]}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
});