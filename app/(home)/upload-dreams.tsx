import BackButtonWithText from '@/components/BackButtonWithText';
import CenteredTitle from '@/components/CenteredTitle';
import NextButton from '@/components/NextButton';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UploadDreamsScreen() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImageUpload = (index: number) => {
    // Handle image upload logic here
    console.log(`Upload image for section ${index + 1}`);
    // For now, just add a placeholder
    setUploadedImages(prev => [...prev, `image_${index + 1}`]);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving uploaded images:', uploadedImages);
    // Navigate to success screen
    router.push('/(home)/success-setup');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Static */}
      <View style={styles.header}>
        <BackButtonWithText />
        <CenteredTitle title="Upload a Picture of your Dreams" />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {[1, 2, 3].map((section, index) => (
          <TouchableOpacity
            key={index}
            style={styles.uploadSection}
            onPress={() => handleImageUpload(index)}
            activeOpacity={0.7}
          >
            <View style={styles.uploadIconContainer}>
              <Image
                source={require('@/assets/images/uplad.png')}
                style={styles.uploadIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Button - Static */}
      <View style={styles.bottomContainer}>
        <NextButton
          onPress={handleSave}
          text="Save"
          style={styles.saveButton}
          textStyle={styles.saveButtonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  uploadSection: {
    height: 200,
    marginBottom: 20,
    backgroundColor: '#FFE5E9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  uploadIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    tintColor: '#666666',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
  },
  saveButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: '#D11A38',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});