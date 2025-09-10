import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SkipButtonProps {
  onPress?: () => void;
  style?: any;
  textStyle?: any;
}

export default function SkipButton({ onPress, style, textStyle }: SkipButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/(auth)/login');
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