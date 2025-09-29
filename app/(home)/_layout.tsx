import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="profile-information" />
      <Stack.Screen name="add-motivation" />
      <Stack.Screen name="upload-dreams" />
      <Stack.Screen name="success-setup" />
      <Stack.Screen name="my-completed-100" />
      <Stack.Screen name="my-daily-100" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="contact" />
      <Stack.Screen name="contact-form" />
      <Stack.Screen name="journal" />
      <Stack.Screen name="add-journal" />
      <Stack.Screen name="edit-journal" />
      <Stack.Screen name="journal-detail" />
      <Stack.Screen name="library" />
      <Stack.Screen name="add-personal-goals" />
      <Stack.Screen name="daily-journal" />
      <Stack.Screen name="daily-must" />
      <Stack.Screen name="daily-calls" />
      <Stack.Screen name="daily-performance-indicator" />
      <Stack.Screen name="notes" />
      <Stack.Screen name="next-screen" />
      <Stack.Screen name="scorecard-screen" />
      <Stack.Screen name="coach-selection" />
      <Stack.Screen name="date-time-selection" />
      <Stack.Screen name="payment-details" />
      <Stack.Screen name="payment-success" />
    </Stack>
  );
}