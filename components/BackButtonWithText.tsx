import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface BackButtonWithTextProps {
  onPress?: () => void;
  style?: any;
  isDarkMode?: boolean;
}

export default function BackButtonWithText({ onPress, style, isDarkMode }: BackButtonWithTextProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity style={[styles.backContainer, style]} onPress={handlePress}>
      <Text style={[styles.backIcon, isDarkMode && styles.backIconDark]}>‹</Text>
      <Text style={[styles.backText, isDarkMode && styles.backTextDark]}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#595959',
    marginRight: 4,
    lineHeight: 28,
    textAlignVertical: 'center',
    marginTop: -2,
  },
  backIconDark: {
    fontSize: 28,
    color: '#FFFFFF',
    marginRight: 4,
    lineHeight: 28,
    textAlignVertical: 'center',
    marginTop: -2,
  },
  backText: {
    fontSize: 16,
    color: '#595959',
    fontWeight: '500',
    lineHeight: 16,
    textAlignVertical: 'center',
  },
  backTextDark: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 16,
    textAlignVertical: 'center',
  },
});