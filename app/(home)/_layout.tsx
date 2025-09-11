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
      <Stack.Screen name="settings" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="contact-us" />
    </Stack>
  );
}