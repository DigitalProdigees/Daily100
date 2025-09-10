import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface NextButtonProps {
  onPress: () => void;
  text?: string;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
}

export default function NextButton({ 
  onPress, 
  text = 'Next', 
  style, 
  textStyle, 
  disabled = false 
}: NextButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.nextButton, 
        disabled && styles.disabledButton,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.nextText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: '#D11A38',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});