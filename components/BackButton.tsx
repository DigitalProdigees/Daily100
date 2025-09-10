import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface BackButtonProps {
  onPress?: () => void;
  style?: any;
}

export default function BackButton({ onPress, style }: BackButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.backButton, style]} 
      onPress={handlePress}
    >
      <Image 
        source={require('@/assets/images/backB.png')} 
        style={styles.backButtonImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
});