import BackButtonWithText from '@/components/BackButtonWithText';
import CenteredTitle from '@/components/CenteredTitle';
import NextButton from '@/components/NextButton';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UploadedImage {
  uri: string;
  id: string;
}

export default function UploadDreamsScreen() {
  const [uploadedImages, setUploadedImages] = useState<(UploadedImage | null)[]>([null, null, null]);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images!');
      return false;
    }
    return true;
  };

  const showImagePickerOptions = (index: number) => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => pickImageFromCamera(index) },
        { text: 'Gallery', onPress: () => pickImageFromGallery(index) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const pickImageFromCamera = async (index: number) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const newImage: UploadedImage = {
        uri: result.assets[0].uri,
        id: `image_${index}_${Date.now()}`
      };
      
      setUploadedImages(prev => {
        const updated = [...prev];
        updated[index] = newImage;
        return updated;
      });
    }
  };

  const pickImageFromGallery = async (index: number) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      const newImage: UploadedImage = {
        uri: result.assets[0].uri,
        id: `image_${index}_${Date.now()}`
      };
      
      setUploadedImages(prev => {
        const updated = [...prev];
        updated[index] = newImage;
        return updated;
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const handleImageUpload = (index: number) => {
    showImagePickerOptions(index);
  };

  const handleSave = () => {
    // Check if at least one image is uploaded
    const hasUploadedImages = uploadedImages.some(image => image !== null);
    
    if (!hasUploadedImages) {
      Alert.alert(
        'No Images Selected',
        'Please upload at least one dream image before saving.',
        [{ text: 'OK' }]
      );
      return;
    }

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
          <View key={index} style={styles.uploadSectionContainer}>
            {uploadedImages[index] ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: uploadedImages[index]!.uri }}
                  style={styles.uploadedImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.changeImageButton}
                  onPress={() => handleImageUpload(index)}
                >
                  <Image
                    source={require('@/assets/images/pencil2.png')}
                    style={styles.changeImageIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
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
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Button - Static */}
      <View style={styles.bottomContainer}>
        <NextButton
          onPress={handleSave}
          text={uploadedImages.some(image => image !== null) ? "Save" : "Select at least one Dream picture"}
          style={[
            styles.saveButton,
            !uploadedImages.some(image => image !== null) && styles.saveButtonDisabled
          ]}
          textStyle={[
            styles.saveButtonText,
            !uploadedImages.some(image => image !== null) && styles.saveButtonTextDisabled
          ]}
          disabled={!uploadedImages.some(image => image !== null)}
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
  uploadSectionContainer: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  uploadSection: {
    height: 200,
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
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#D11A38',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeImageIcon: {
    width: 18,
    height: 18,
    tintColor: 'white',
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
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  saveButtonTextDisabled: {
    color: '#999999',
  },
});