import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface CenteredTitleProps {
  title: string;
  style?: any;
}

export default function CenteredTitle({ title, style }: CenteredTitleProps) {
  return (
    <Text style={[styles.title, style]}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
  },
});