import BackButton from '@/components/BackButton';
import PageIndicator from '@/components/PageIndicator';
import SkipButton from '@/components/SkipButton';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeaturesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <SkipButton />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Plant Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/Plant.png')} 
            style={styles.plantImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <ThemedText type="title" style={styles.title}>
            Chart Your{'\n'}
            <Text style={styles.titleHighlight}>Success Course</Text>
          </ThemedText>
          
          <ThemedText type="default" style={styles.subtitle}>
            Define goals, track progress, and thrive with My Daily 100. Your personal journey{' '}
            <Text style={styles.subtitleHighlight}>Starts Here</Text>
          </ThemedText>
          
          {/* Page Indicator */}
          <PageIndicator totalPages={4} currentPage={1} />
        </View>
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        {/* Back Button */}
        <BackButton />
        
        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('/(onboarding)/permissions')}
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
  plantImage: {
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
    marginBottom: 30,
  },
  subtitleHighlight: {
    color: '#D11A38',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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