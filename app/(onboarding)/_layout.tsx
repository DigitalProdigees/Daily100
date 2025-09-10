import { Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Disable swipe back gesture
      }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="features" />
      <Stack.Screen name="permissions" />
      <Stack.Screen name="success" />
    </Stack>
  );
}