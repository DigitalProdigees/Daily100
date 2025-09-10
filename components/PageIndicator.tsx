import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PageIndicatorProps {
  totalPages: number;
  currentPage: number;
  style?: any;
}

export default function PageIndicator({ totalPages, currentPage, style }: PageIndicatorProps) {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalPages }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentPage ? styles.activeDot : styles.inactiveDot
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFB3BA',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 9,
    backgroundColor: '#D11A38',
  },
  inactiveDot: {
    backgroundColor: '#FFB3BA',
  },
});