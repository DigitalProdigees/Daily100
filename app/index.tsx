import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  useEffect(() => {
    // Navigate to splash screen first
    router.replace('/splash');
  }, []);

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <ThemedText style={{ marginTop: 16, fontSize: 16 }}>
        Loading...
      </ThemedText>
    </ThemedView>
  );
}