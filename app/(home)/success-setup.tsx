import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessSetupScreen() {
  useEffect(() => {
    // Navigate to home screen after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(home)/(tabs)');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/tick.png')}
            style={styles.successIcon}
            resizeMode="contain"
          />
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Successfully Set up</Text>
        <Text style={styles.subtitle}>Congratulations! your profile account was set</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    
        justifyContent: 'center',
    alignItems: 'center',
   marginBottom:30
  },
  successIcon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});