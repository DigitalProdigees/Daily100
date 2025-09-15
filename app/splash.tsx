import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../config/firebase';
import { useAuthContext } from '../contexts/AuthContext';
import { DebugStorage } from '../utils/debugStorage';
import { StorageService } from '../utils/storage';

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const { isAuthenticated, loading } = useAuthContext();
  const [hasCheckedOnboarding, setHasCheckedOnboarding] = useState(false);

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

    checkOnboardingAndAuth();
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    if (!loading && hasCheckedOnboarding) {
      console.log('Splash - Auth state changed, re-evaluating navigation...');
      console.log('Splash - Current auth state:', {
        isAuthenticated,
        loading,
        authUser: auth.currentUser ? auth.currentUser.email : 'No user'
      });
      
      // Re-evaluate navigation based on current auth state
      evaluateNavigation();
    }
  }, [isAuthenticated, loading, hasCheckedOnboarding]);

  const checkOnboardingAndAuth = async () => {
    try {
      console.log('Splash - Starting app state check...');
      const hasCompletedOnboarding = await StorageService.hasCompletedOnboarding();
      
      console.log('Splash - App state check results:', {
        isAuthenticated,
        hasCompletedOnboarding,
        loading,
        authUser: auth.currentUser ? auth.currentUser.email : 'No user'
      });
      
      setHasCheckedOnboarding(true);
      
      // If onboarding not completed, show onboarding immediately
      if (!hasCompletedOnboarding) {
        console.log('Splash - First time user, showing onboarding');
        setTimeout(() => {
          router.replace('/(onboarding)/welcome');
        }, 2000);
        return;
      }
      
      // If onboarding completed, wait for auth state to be determined
      // The auth state change listener will handle navigation
      console.log('Splash - Onboarding completed, waiting for auth state...');
      console.log('Splash - Will wait for auth state change to determine navigation');
      
    } catch (error) {
      console.error('Error checking app state:', error);
      // Default to onboarding if there's an error
      setTimeout(() => {
        router.replace('/(onboarding)/welcome');
      }, 2000);
    }
  };

  const evaluateNavigation = async () => {
    try {
      const hasCompletedOnboarding = await StorageService.hasCompletedOnboarding();
      
      console.log('Splash - evaluateNavigation called:', {
        hasCompletedOnboarding,
        isAuthenticated,
        loading
      });
      
      if (hasCompletedOnboarding) {
        if (isAuthenticated) {
          // Check if user has completed profile setup
          const hasCompletedProfileSetup = await StorageService.hasCompletedProfileSetup();
          console.log('Splash - Profile setup status:', hasCompletedProfileSetup);
          
          if (hasCompletedProfileSetup) {
            console.log('Splash - User authenticated and profile setup completed, navigating to home');
            router.replace('/(home)/(tabs)');
          } else {
            console.log('Splash - User authenticated but profile setup not completed, navigating to profile');
            router.replace('/(home)/profile-information');
          }
        } else {
          console.log('Splash - User not authenticated, navigating to login');
          router.replace('/(auth)/login');
        }
      } else {
        console.log('Splash - Onboarding not completed, should not reach here');
      }
    } catch (error) {
      console.error('Splash - Error during navigation evaluation:', error);
    }
  };

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

        {/* Debug Buttons - Only in development */}
        {__DEV__ && (
          <View style={styles.debugContainer}>
            <TouchableOpacity 
              style={styles.debugButton}
              onPress={async () => {
                await DebugStorage.forceSetOnboardingCompleted();
                await DebugStorage.getAllKeys();
              }}
            >
              <Text style={styles.debugButtonText}>Force Complete Onboarding</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.debugButton}
              onPress={async () => {
                await DebugStorage.clearOnboardingState();
                await DebugStorage.getAllKeys();
              }}
            >
              <Text style={styles.debugButtonText}>Clear Onboarding</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.debugButton}
              onPress={async () => {
                await StorageService.debugClearProfileSetup();
                await StorageService.debugGetAllKeys();
              }}
            >
              <Text style={styles.debugButtonText}>Clear Profile Setup</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.debugButton}
              onPress={async () => {
                await StorageService.debugGetAllKeys();
              }}
            >
              <Text style={styles.debugButtonText}>Show All Storage</Text>
            </TouchableOpacity>
          </View>
        )}
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
  debugContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  debugButton: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  debugButtonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});