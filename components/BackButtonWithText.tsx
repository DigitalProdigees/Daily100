import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface BackButtonWithTextProps {
  onPress?: () => void;
  style?: any;
}

export default function BackButtonWithText({ onPress, style }: BackButtonWithTextProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity style={[styles.backContainer, style]} onPress={handlePress}>
      <Text style={styles.backIcon}>‹</Text>
      <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    flexDirection: 'row',
    
  },
  backIcon: {
    fontSize: 28,
    color: '#595959',
    marginRight: 4,
    lineHeight: 27,
    justifyContent:'center'
  },
  backText: {
    fontSize: 16,
    color: '#595959',
    fontWeight: '500',
    lineHeight: 24,
  },
});