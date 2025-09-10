import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/(onboarding)/welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Background Sprinkles */}
        <View style={styles.sprinklesContainer}>
          <View style={[styles.sprinkle, styles.sprinkle1]} />
          <View style={[styles.sprinkle, styles.sprinkle2]} />
          <View style={[styles.sprinkle, styles.sprinkle3]} />
          <View style={[styles.sprinkle, styles.sprinkle4]} />
          <View style={[styles.sprinkle, styles.sprinkle5]} />
          <View style={[styles.sprinkle, styles.sprinkle6]} />
        </View>

        {/* Main Logo Container */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <Image 
            source={require('@/assets/images/100.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
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
    position: 'relative',
  },
  sprinklesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sprinkle: {
    position: 'absolute',
    borderRadius: 50,
  },
  sprinkle1: {
    width: 8,
    height: 8,
    backgroundColor: '#FFB3BA',
    top: '20%',
    left: '15%',
  },
  sprinkle2: {
    width: 6,
    height: 6,
    backgroundColor: '#D11A38',
    top: '30%',
    right: '20%',
  },
  sprinkle3: {
    width: 10,
    height: 10,
    backgroundColor: '#FF6B6B',
    bottom: '25%',
    left: '10%',
  },
  sprinkle4: {
    width: 7,
    height: 7,
    backgroundColor: '#FF8E8E',
    bottom: '35%',
    right: '15%',
  },
  sprinkle5: {
    width: 5,
    height: 5,
    backgroundColor: '#FFA8A8',
    top: '60%',
    left: '25%',
  },
  sprinkle6: {
    width: 9,
    height: 9,
    backgroundColor: '#FF9F9F',
    top: '70%',
    right: '25%',
  },
  logoContainer: {
    shadowColor: '#D11A38',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  logo: {
    width: 120,
    height: 90,
  },
});