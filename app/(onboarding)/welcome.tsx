import PageIndicator from '@/components/PageIndicator';
import SkipButton from '@/components/SkipButton';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <SkipButton />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Character Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/Character.png')} 
            style={styles.characterImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <ThemedText type="title" style={styles.title}>
            Unlock your{'\n'}
            <Text style={styles.titleHighlight}>Potential Now</Text>
          </ThemedText>
          
          <ThemedText type="default" style={styles.subtitle}>
            Visualize and track daily progress, turning obstacles into stepping stones with
          </ThemedText>
          
          <View style={styles.appNameContainer}>
            <ThemedText type="default" style={styles.appNameText}>My Daily </ThemedText>
            <Image 
              source={require('@/assets/images/100.png')} 
              style={styles.appNameIcon}
              resizeMode="contain"
            />
          </View>
          
          {/* Page Indicator */}
          <PageIndicator totalPages={4} currentPage={0} />
        </View>
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('/(onboarding)/features')}
        >
          <IconSymbol name="chevron.right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  time: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  characterImage: {
    width: '100%',
    height: '100%',
    maxHeight: 400,
  },
  textContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 38,
  },
  titleHighlight: {
    color: '#D11A38',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8E8E93',
    lineHeight: 24,
  },
  appNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  appNameText: {
    fontSize: 16,
    color: '#8E8E93',

  textAlign: 'center',
  },
  appNameIcon: {
    width: 28,
    height: 28,
    marginLeft: 4,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D11A38',
    justifyContent: 'center',
    alignItems: 'center',
  },
});