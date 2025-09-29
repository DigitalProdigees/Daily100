import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentSuccessScreen() {
  useEffect(() => {
    // Auto-navigate to coach-selection after 2 seconds
    const timer = setTimeout(() => {
      router.push('/(home)/coach-selection');
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
            style={styles.tickIcon}
            resizeMode="contain"
          />
        </View>

        {/* Success Text */}
        <Text style={styles.successTitle}>Payment Success!</Text>
        <Text style={styles.successSubtitle}>We will direct to your session</Text>
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
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  tickIcon: {
    width: 110,
    height:110,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D11A38',
    textAlign: 'center',
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 24,
  },
});