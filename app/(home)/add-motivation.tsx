import BackButtonWithText from '@/components/BackButtonWithText';
import CenteredTitle from '@/components/CenteredTitle';
import NextButton from '@/components/NextButton';
import { StorageService } from '@/utils/storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddMotivationScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const motivationCategories = [
    {
      id: 'health',
      title: 'Health',
      image: require('@/assets/images/1.png'),
    },
    {
      id: 'wealth',
      title: 'Wealth',
      image: require('@/assets/images/2.png'),
    },
    {
      id: 'travel',
      title: 'Travel',
      image: require('@/assets/images/3.png'),
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleUploadDreams = async () => {
    if (selectedCategory) {
      // Find the selected category data
      const selectedCategoryData = motivationCategories.find(cat => cat.id === selectedCategory);
      
      if (selectedCategoryData) {
        // Save the motivation data to storage
        await StorageService.saveMotivationData({
          id: selectedCategoryData.id,
          title: selectedCategoryData.title,
          image: selectedCategoryData.image
        });
      }
    }
    
    // Navigate to upload dreams screen
    router.push('/(home)/upload-dreams');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Static */}
      <View style={styles.header}>
        <BackButtonWithText />
        <CenteredTitle title="Add Motivation" />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {motivationCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.motivationCard,
              selectedCategory === category.id && styles.selectedCard
            ]}
            onPress={() => handleCategorySelect(category.id)}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={category.image}
              style={styles.cardBackground} 
              resizeMode="cover"
            >
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle}>{category.title}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Button - Static */}
      <View style={styles.bottomContainer}>
        <NextButton
          onPress={handleUploadDreams}
          text="Upload your Dreams"
          style={styles.uploadButton}
          textStyle={styles.uploadButtonText}
          disabled={!selectedCategory}
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
    paddingBottom: 20,
  },
  motivationCard: {
    height: 200,
    marginBottom: 20,
    backgroundColor: 'transparent',
    
  },
  selectedCard: {
   marginHorizontal:16,
   borderWidth:3,
   borderColor:'#D11A38',
   height:200,
   borderRadius:16
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    top:7
  },
  
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
  },
  uploadButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#D11A38',
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});