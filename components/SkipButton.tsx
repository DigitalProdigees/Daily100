import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StorageService } from '../utils/storage';

interface SkipButtonProps {
  onPress?: () => void;
  style?: any;
  textStyle?: any;
}

export default function SkipButton({ onPress, style, textStyle }: SkipButtonProps) {
  const handlePress = async () => {
    try {
      console.log('Skip Button - User clicked skip, marking onboarding as completed');
      
      // Mark onboarding as completed when user skips
      await StorageService.setOnboardingCompleted();
      console.log('Skip Button - Onboarding marked as completed');
      
      if (onPress) {
        onPress();
      } else {
        // Navigate to login after marking onboarding as completed
        console.log('Skip Button - Navigating to login');
        router.push('/(auth)/login');
      }
    } catch (error) {
      console.error('Skip Button - Error during skip process:', error);
      // Still navigate even if there's an error
      if (onPress) {
        onPress();
      } else {
        router.push('/(auth)/login');
      }
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.skipButton, style]} 
      onPress={handlePress}
    >
      <Text style={[styles.skipText, textStyle]}>Skip</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D11A38',
  },
});